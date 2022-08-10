const pool = require("../utils/db");
const locator = require("../utils/ipLocator");

const insertUserInfo = async (body, user_id, ip) => {
	
  if (body.location.length === 0) {
	body.location = await locator(ip);
  }

  try {
    const queryResponse = await pool.query(
      "UPDATE users SET gender = $1, sexuality = $2, bio = $3, tags = $4, location = $5 WHERE user_id = $6",
      [body.gender, body.sexualPreference, body.bio, body.tags, body.location, user_id]
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
