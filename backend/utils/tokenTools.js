const jwt = require("jsonwebtoken");

const getToken = (request) => {
  const auth = request.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer")) {
    return auth.substring(7);
  }
  return false;
};

const verifyToken = (request) => {
  if (request) {
    const userToken = getToken(request);
    if (!userToken) {
      return false;
    } else {
      const decodedToken = jwt.verify(userToken, process.env.SECRET);

      if (!decodedToken.id) {
        return false;
      }
      return decodedToken;
    }
  } else {
    return false;
  }
};

module.exports = { getToken, verifyToken };
