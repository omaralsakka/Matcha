const jwt = require("jsonwebtoken");

const getToken = (request) => {
  const auth = request.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer")) {
    return auth.substring(7);
  }
  return null;
};

const verifyToken = (request) => {
  const userToken = getToken(request);
  const decodedToken = jwt.verify(userToken, process.env.SECRET);
  if (!decodedToken.id) {
    return false;
  }
  return decodedToken;
};

module.exports = { getToken, verifyToken };
