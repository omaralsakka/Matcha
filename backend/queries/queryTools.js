const pool = require("../utils/db");
const generateRandom = require("../utils/generateRandom");
const { cryptPassword } = require("../utils/cryptPassword");

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

module.exports = {
  selectOneQualifier,
  unionOneQualifier,
  insertForgottenPassword,
  updatePassword,
};
