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

module.exports = {
	insertUserInfo,
  };