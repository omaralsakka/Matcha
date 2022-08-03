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

// function that will take the verified user info and move it to users table.
const verifyUser = async (verificationCode) => {
  try {
    const queryResponse = await pool.query(
      "SELECT * FROM user_verify WHERE verify_code = $1",
      [verificationCode]
    );
    const info = queryResponse.rows[0];
    if (info) {
      const insertResponse = await insertUser(info);
      const deleteFromVerify = await pool.query(
        "DELETE FROM user_verify WHERE verify_code = $1",
        [verificationCode]
      );
      return insertResponse.rows;
    } else {
      return "Error: verification code already deleted";
    }
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { insertUser, insertUserVerify, verifyUser };
