const queryTools = require("../queries/queryTools");

const getConnections = async (connections) => {
  let users = [];
  for (let index = 0; index < connections.length; index++) {
    const usersResponse = await queryTools.selectOneQualifier(
      "users",
      "user_id",
      connections[index]
    );
    if (usersResponse.rows.length) {
      users.push(usersResponse.rows[0]);
    }
  }
  return users;
};

module.exports = getConnections;
