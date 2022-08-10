const pool = require("../utils/db");

const getUserLocation = async (userId) => {
  try {
    const queryResponse = await pool.query(
      "SELECT * FROM location WHERE user_id = $1 ",
      [userId]
    );
    return queryResponse.rows;
  } catch (error) {
    console.error(error.message);
  }
};

const allGender = async (gender) => {
  try {
    const queryResponse = await pool.query(
      "SELECT username FROM users WHERE gender = $1",
      [gender]
    );
    return queryResponse;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

const allSexPref = async (sexPref) => {
  try {
    const queryResponse = await pool.query(
      "SELECT username FROM users WHERE sexuality = $1",
      [sexPref]
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

const allUserNames = async () => {
	try {
		const queryResponse = await pool.query(
			"SELECT users.username FROM users UNION ALL SELECT user_verify.username FROM user_verify"
		);
		return queryResponse.rows;
	} catch (error) {
		console.error(error.message)
		return error.message
	}
}

const allEmails = async () => {
	try {
		const queryResponse = await pool.query(
			"SELECT users.email FROM users UNION ALL SELECT user_verify.email FROM user_verify"
		);
		return queryResponse.rows;
	} catch (error) {
		console.error(error.message)
		return error.message
	}
}

module.exports = {
  allGender,
  allSexPref,
  allBlocked,
  allLikes,
  fameRating,
  allViews,
  getUserLocation,
  allEmails,
  allUserNames,
};
