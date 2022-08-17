const pool = require("../utils/db");
const locator = require("../utils/ipLocator");

const insertUserInfo = async (
  { gender, sexualPreference, bio, tags, location },
  user_id,
  ip
) => {
  if (location.length === 0) {
    location = await locator(ip);
  }
  const locationArr = location.split(", ");
  try {
    const queryResponse = await pool.query(
      "UPDATE users SET gender = $1, sexuality = $2, bio = $3, tags = $4, city = $5, country = $6 WHERE user_id = $7",
      [
        gender,
        sexualPreference,
        bio,
        tags,
        locationArr[0],
        locationArr[1],
        user_id,
      ]
    );
    return queryResponse;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

const insertUserPictures = async (imageData, user_id) => {
  try {
    const respPicturesTable = await pool.query(
      "INSERT INTO pictures(picture, user_id) VALUES($1, $2)",
      [imageData, user_id]
    );
    const respUsersTable = await pool.query(
      "UPDATE users SET pictures = 1 WHERE user_id = $1 RETURNING *",
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

const getProfilePictures = async () => {
  try {
    const queryResponse = await pool.query(
      "SELECT DISTINCT user_id,picture from pictures"
    );
    return queryResponse;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

const likeUserQuery = async (likedUserId, LikedById) => {
  try {
    const queryResponse = await pool.query(
      "UPDATE users SET liked_by = array_append(liked_by, $1) WHERE user_id = $2 RETURNING *",
      [LikedById, likedUserId]
    );
    return queryResponse;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

const disLikeUserQuery = async (disLikedUserId, disLikedById) => {
  try {
    const queryResponse = await pool.query(
      "UPDATE users SET liked_by = array_remove(liked_by, $1) WHERE user_id = $2 RETURNING *",
      [disLikedById, disLikedUserId]
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
  getProfilePictures,
  likeUserQuery,
  disLikeUserQuery,
};
