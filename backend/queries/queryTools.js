const pool = require("../utils/db");
const generateRandom = require("../utils/generateRandom");
const { cryptPassword } = require("../utils/cryptPassword");

const selectAllTable = async (table) => {
  try {
    const queryResponse = await pool.query(`SELECT * FROM ${table}`);
    return queryResponse;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

const selectOneQualifier = async (table, column, qualifier) => {
  try {
    const queryResponse = await pool.query(
      `SELECT * FROM ${table} WHERE ${column} = $1`,
      [qualifier]
    );
    return queryResponse;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

const unionOneQualifier = async (column, tableTwo) => {
  try {
    const queryResponse = await pool.query(
      `SELECT users.${column} FROM users UNION ALL SELECT ${tableTwo}.${column} FROM ${tableTwo}`
    );
    return queryResponse.rows;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

const insertForgottenPassword = async (email) => {

	try {
		const users = await pool.query(
			"SELECT email FROM forgotten_password WHERE email = $1",
			[email]
		);
		const response = users.rows[0];
		if(response){
			if(response.email === email) {
				const deleteUser = await pool.query(
					"DELETE FROM forgotten_password WHERE email = $1",
					[email]
				);
			};
		}

		const verificationCode = generateRandom(50);

		const queryResponse = await pool.query(
			"INSERT INTO forgotten_password(email, verify_code) VALUES($1, $2) RETURNING *",
			[email, verificationCode]
		);
		return verificationCode;
	} catch (error) {
		console.error(error.message);
		return error.message;
	}
	return
}

const updatePassword = async (password, email) => {

	try {
		const cryptedPass = await cryptPassword(password);
		const queryResponse = await pool.query(
			"UPDATE users SET password = $1 WHERE email = $2",
			[cryptedPass, email]
		)
		return queryResponse.rows;
	} catch (error) {
		console.error(error.message);
		return error.message;
	}
}

const emailChangeRequest = async ({
	username,
	user_id,
	email,
	fullname,
	newPW
  }) => {
	try {
		const user = await pool.query(
			"SELECT user_id FROM user_verify WHERE user_id = $1",
			[user_id]
		);
		const response = user.rows[0];
		if(response){
			if(response.user_id === user_id) {
				const deleteUser = await pool.query(
					"DELETE FROM user_verify WHERE user_id = $1",
					[user_id]
				);
			};
		}
	  const verificationCode = generateRandom(50);
	  const queryResponse = await pool.query(
		"INSERT INTO user_verify(username, user_id, email, fullname, password, verify_code) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
		[username, user_id, email, fullname, newPW, verificationCode]
	  );
	  return verificationCode;
	} catch (error) {
	  console.error(error.message);
	  return error.message;
	}
  };

const changeEmail = async (verificationCode) => {
	try {
	  const queryResponse = await pool.query(
		"SELECT * FROM user_verify WHERE verify_code = $1",
		[verificationCode]
	  );
	  const info = queryResponse.rows[0];
	  if (info) {
		const deleteFromVerify = await pool.query(
		  "DELETE FROM user_verify WHERE verify_code = $1",
		  [verificationCode]
		);
		const updateEmail = await pool.query(
			"UPDATE users SET email = $1 WHERE user_id = $2",
			[info.email, info.user_id]
		);
		return updateEmail;
	  } else {
		return false; // this might give an error in console if the verification code does not exist ..
	  }
	} catch (error) {
	  console.error(error.message);
	}
};

module.exports = {
  selectAllTable,
  selectOneQualifier,
  unionOneQualifier,
  insertForgottenPassword,
  updatePassword,
  emailChangeRequest,
  changeEmail
};
