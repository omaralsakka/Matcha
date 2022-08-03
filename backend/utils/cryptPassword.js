const bcrypt = require("bcrypt");

const cryptPassword = async (password) => {
  const saltRounds = 10;
  const result = await bcrypt.hash(password, saltRounds);
  return result;
};

module.exports = cryptPassword;
