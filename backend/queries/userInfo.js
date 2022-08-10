const pool = require("../utils/db");

const insertUserInfo = async (body, user_id) => {
  try {
    const queryResponse = await pool.query(
      "UPDATE users SET gender = $1, sexuality = $2, bio = $3, tags = $4 WHERE user_id = $5",
      [body.gender, body.sexualPreference, body.bio, body.tags, user_id]
    );
    return queryResponse;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

const insertUserPictures = async (body, user_id) => {
  try {
    const respPicturesTable = await pool.query(
      "INSERT INTO pictures(picture, user_id) VALUES($1, $2)",
      [body, user_id]
    );
    const respUsersTable = await pool.query(
      "UPDATE users SET pictures = 1 WHERE user_id = $1",
      [user_id]
    );
    console.log("inserted pictures succefully");
    return respPicturesTable;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

const getUserPictures = async (user_id) => {
  try {
    const queryResponse = await pool.query(
      "SELECT * FROM pictures WHERE user_id = $1",
      [user_id]
    );
    return queryResponse;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

module.exports = {
  insertUserInfo,
  insertUserPictures,
  getUserPictures,
};
