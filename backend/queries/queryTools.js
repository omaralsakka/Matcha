const pool = require("../utils/db");

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

module.exports = {
  selectAllTable,
  selectOneQualifier,
  unionOneQualifier,
};
