const pool = require("../utils/db");
const bcrypt = require("bcrypt");
const locator = require("../utils/ipLocator");
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
  insertSettings,
  getPassword,
};
