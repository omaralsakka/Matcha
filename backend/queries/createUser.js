const pool = require("../utils/db");
const generateRandom = require("../utils/generateRandom");
const { cryptPassword, checkPassword } = require("../utils/cryptPassword");

const insertUser = async ({ username, email, fullname, password }) => {
  try {
    const queryResponse = await pool.query(
      "INSERT INTO users(username, email, fullname, password) VALUES($1, $2, $3, $4) RETURNING *",
      [username, email, fullname, password]
    );
    return queryResponse;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

const insertUserVerify = async ({ username, email, fullname, password }) => {
  try {
    const verificationCode = generateRandom(50);
    const cryptedPass = await cryptPassword(password);

    const queryResponse = await pool.query(
      "INSERT INTO user_verify(username, email, fullname, password, verify_code) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [username, email, fullname, cryptedPass, verificationCode]
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

// function that logges in the user if all given info are correct
const loginUser = async ({ username, password }) => {
  try {
    const queryResponse = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (queryResponse.rows[0]) {
      const checkPass = await checkPassword(
        password,
        queryResponse.rows[0].password
      );
      if (checkPass) {
        return queryResponse.rows[0];
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { insertUser, insertUserVerify, verifyUser, loginUser };
