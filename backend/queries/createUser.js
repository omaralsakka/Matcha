const pool = require("../utils/db");

const insertUser = async (body) => {
  try {
    const queryResponse = await pool.query(
      "INSERT INTO users(username, email, fullname, password) VALUES($1, $2, $3, $4) RETURNING *",
      [body.username, body.email, body.fullname, body.password]
    );
    return queryResponse;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

module.exports = insertUser;
