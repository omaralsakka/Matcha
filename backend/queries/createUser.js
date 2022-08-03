const pool = require("../utils/db");
const generateRandom = require("../utils/generateRandom");
const cryptPassword = require("../utils/cryptPassword");

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

const insertUserVerify = async (body) => {
  try {
    const verificationCode = generateRandom(50);
    const cryptedPass = await cryptPassword(body.password);

    const queryResponse = await pool.query(
      "INSERT INTO user_verify(username, email, fullname, password, verify_code) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [body.username, body.email, body.fullname, cryptedPass, verificationCode]
    );
    return verificationCode;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

module.exports = { insertUser, insertUserVerify };
