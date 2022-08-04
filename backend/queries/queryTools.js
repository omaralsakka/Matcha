const pool = require("../utils/db");

const allGender = async (type) => {
	try {
		const queryResponse = await pool.query(
			"SELECT username FROM users WHERE gender = $1",
			[type]
		);
		return queryResponse;
	} catch (error) {
		console.error(error.message);
		return error.message;
	}
};

const allSexPref = async (type) => {
	try {
		const queryResponse = await pool.query(
			"SELECT username FROM users WHERE sexuality = $1", 
		[type]
		);
		return queryResponse;
	} catch (error) {
		console.error(error.message);
		return error.message;
	}
};

const allBlocked = async (block, name) => {
	try {
		const queryResponse = await pool.query(
			"SELECT $1 FROM users WHERE username = $2",
			[block, name]
		);
		return queryResponse;
	} catch (error) {
		console.error(error.message);
		return error.message;
	}
};

const allLikes = async (like, name) => {
	try {
		const queryResponse = await pool.query(
			"SELECT $1 FROM users WHERE username = $2",
			[like, name]
		);
		return queryResponse;
	} catch (error) {
		console.error(error.message);
		return error.message;
	}
};

const fameRating = async (name) => {
	try {
		const queryResponse = await pool.query(
			"SELECT fame_rating FROM users WHERE username = $1",
			[name]
		);
		return queryResponse;
	} catch (error) {
		console.error(error.message);
		return error.message;
	}
};

const allViews = async (name) => {
	try {
		const queryResponse = await pool.query(
			"SELECT views FROM users WHERE username = $1",
			[name]
		);
		return queryResponse;
	} catch (error) {
		console.error(error.message);
		return error.message;
	}
};

/* const allTag = async (type) => {
	try {
		const queryResponse = await pool.query(
			"SELECT username FROM users WHERE $1 = any(tags)",
			[type]
		);
	} catch (error) {
		console.error(error.message);
		return error.message;
	}
} */

module.exports = {allGender, allSexPref, allBlocked, allLikes, fameRating, allViews, /* allTag */};