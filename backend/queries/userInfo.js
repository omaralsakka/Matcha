const pool = require("../utils/db");
const bcrypt = require("bcrypt");
const locator = require("../utils/ipLocator");
const queryTools = require("./queryTools");
const checkPassword = require("../utils/cryptPassword")

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

const updateUserSearchQuery = async (user_id, searchData) => {
  try {
    const getSearch = await queryTools.selectOneQualifier(
      "user_search",
      "user_id",
      user_id
    );
    if (getSearch.rows.length) {
      const queryResponse = await pool.query(
        "UPDATE user_search SET age_range = $1, fame_range = $2, city = $3, country = $4, tags = $5 WHERE user_id = $6 RETURNING *",
        [
          searchData.ageRange,
          searchData.fameRange,
          searchData.city,
          searchData.country,
          searchData.tags,
          user_id,
        ]
      );
      return queryResponse.rows;
    } else {
      const queryResponse = await pool.query(
        "INSERT INTO user_search(user_id, age_range, fame_range, city, country, tags) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
        [
          user_id,
          searchData.ageRange,
          searchData.fameRange,
          searchData.city,
          searchData.country,
          searchData.tags,
        ]
      );
      return queryResponse.rows;
    }
  } catch (error) {
    console.error(error.message);
    return false;
  }
};
const insertSettings = async ({username, fullname, newPW, user_id}) => {
	if(newPW.length === 0) {
		const queryResponse = await pool.query(
			"SELECT password FROM users WHERE user_id = $1",
			[user_id]
		)
		newPW = queryResponse.rows[0].password;
	} else {
		newPW = await bcrypt.hash(newPW, 10);
	}
	try {
	const queryResponse = await pool.query(
		"UPDATE users SET username = $1, fullname = $2, password = $3 WHERE user_id = $4",
		[username, fullname, newPW, user_id]
	);
	return queryResponse.rows;
	} catch (error) {
		console.error(error.message);
		return false;
	}
}

const getPassword = async ({pw, id}) => {
	try {
		const queryResponse = await pool.query(
			"SELECT password FROM users WHERE user_id = $1",
			[id]
		)
		const result = await checkPassword.checkPassword(pw, queryResponse.rows[0].password);
		if(result)
			return (result);
		return ('incorrect')
	} catch (error) {
		console.error(error.message);
		return false;
	}
}

module.exports = {
  insertUserInfo,
  insertUserPictures,
  getUserPictures,
  getProfilePictures,
  likeUserQuery,
  disLikeUserQuery,
  updateUserSearchQuery,
  insertSettings,
  getPassword,
};
