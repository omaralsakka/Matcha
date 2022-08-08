const pool = require("../utils/db");

const insertUserInfo = async (body, token) => {
	try {
		console.log("this is body in query :", body);
		console.log("this is token in query : ", token);

		// REMEMBER TO ADD THE TAGS FOR THE QUERY AND IN OTHER PLACES;

		const queryResponse = await pool.query(
			"UPDATE users SET gender = $1, sexuality = $2, bio = $3 WHERE user_id = $4",
			[body.gender, body.sexualPreference, body.bio, token]
		);
		return queryResponse;

		return ("this is a test");
	} catch (error) {
		console.error(error.message);
		return error.message;
	}
};

module.exports = {
	insertUserInfo,
  };