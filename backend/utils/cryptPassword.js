const bcrypt = require("bcrypt");

const cryptPassword = async (password) => {
  const saltRounds = 10;
  const result = await bcrypt.hash(password, saltRounds);
  return result;
};

const checkPassword = async (password, hashedPass) => {
  const passCheck = await bcrypt.compare(password, hashedPass);
  console.log("this is passCheck:", passCheck);
  return passCheck;
};

module.exports = { cryptPassword, checkPassword };
