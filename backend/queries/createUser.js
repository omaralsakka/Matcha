const config = require("../utils/config");

const userQuery = async (user) => {
  try {
    const userResponse = await config.pool.query(
      "INSERT INTO users(username, email, fullname, password) VALUES(1$, 2$, 3$, 4$) RETURNING *",
      [user.username, user.email, user.fullname, user.password]
    );
    console.log("this is userResponse in query:", userResponse);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  userQuery,
};
