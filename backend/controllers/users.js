const usersRouter = require("express").Router();
const queries = require("../queries/createUser");
const queryTools = require("../queries/queryTools");
const infoQueries = require("../queries/userInfo");
const Mailer = require("../utils/mailer");
const jwt = require("jsonwebtoken");

usersRouter.post("/", async (request, response) => {
  const body = request.body;
  const verificationCode = await queries.insertUserVerify(body);
  if (verificationCode.length === 50) {
    const emailResp = Mailer(
      body.email,
      "Verification for Matcha",
      `Please click on the following link to be verified: http://localhost:3000/api/verify/code=${verificationCode}`
    );
    return response.status(200);
  } else {
    return response.status(401).json({
      error: "email sending error",
    });
  }
});

usersRouter.post("/verify", async (request, response) => {
  const body = request.body;
  const verifyUser = await queries.verifyUser(body.code);
  if (verifyUser) {
    return response.status(200).send(verifyUser);
  } else {
    return response.status(401).json({
      error: "user was already verified",
    });
  }
});

usersRouter.post("/login", async (request, response) => {
  const body = request.body;
  const loggedUser = await queries.loginUser(body);

  if (loggedUser) {
    let infoFilled;
    const userPictures = await queryTools.selectOneQualifier(
      "pictures",
      "user_id",
      loggedUser.user_id
    );
    userPictures.rows.length ? (infoFilled = true) : (infoFilled = false);

    const userForToken = {
      username: loggedUser.username,
      id: loggedUser.user_id,
      infoFilled: infoFilled,
      name: loggedUser.fullname,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);
    return response.status(200).send({
      token,
    });
  } else {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }
});

usersRouter.post("/login/tk", async (request, response) => {
  const body = request.body;
  const loggedUser = await queries.tokenLogin(body);
  if (loggedUser) {
    return response.status(200).send({
      loggedUser,
    });
  } else {
    return response.status(401).json({
      error: "invalid token login",
    });
  }
});

const getToken = (request) => {
  const auth = request.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer")) {
    return auth.substring(7);
  }
  return null;
};

usersRouter.post("/info", async (request, response) => {
  const ip = request.ip;

  const body = request.body;
  const token = getToken(request);

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or expired" });
  }

  const userInfo = await infoQueries.insertUserInfo(body, decodedToken.id, ip);
  if (userInfo) {
    return response.status(200).send(userInfo);
  } else {
    return response.status(401).json({
      error: "inserting user info in database",
    });
  }
});

usersRouter.post("/pictures", async (request, response) => {
  const body = request.body;
  const token = getToken(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or expired" });
  }
  if (body.length) {
    let queryResponse;
    for (let index = 0; index < body.length; index++) {
      queryResponse = await infoQueries.insertUserPictures(
        body[index].data_url,
        decodedToken.id
      );
    }
    return response.status(200).send(queryResponse);
  } else {
    return response.status(401).json({
      error: "saving images error",
    });
  }
});

usersRouter.post("/infoFilledToken", async (request, response) => {
  const oldToken = getToken(request);
  const decodedToken = jwt.verify(oldToken, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "new token generating error" });
  }
  const userForToken = {
    username: decodedToken.username,
    id: decodedToken.user_id,
    infoFilled: true,
    name: decodedToken.fullname,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  return response.status(200).send({
    token,
  });
});

usersRouter.get("/pictures/:id", async (request, response) => {
  const id = request.params.id;

  const queryResponse = await infoQueries.getUserPictures(1);
  if (queryResponse.rows.length) {
    const pictures = queryResponse.rows.map((row) => row.picture);
    return response.status(200).send(pictures);
  } else {
    return response.status(401).json({
      error: "image does not exist",
    });
  }
});

usersRouter.post("/logins", async (request, response) => {
  const body = request.body;
  let info;
  if (body.type === "username") {
    info = await queryTools.allUserNames(body.type);
  } else if (body.type === "email") {
    info = await queryTools.allEmails(body.type);
  }
  if (info) {
    return response.status(200).send(info);
  } else {
    return response.status(404).json({
      error: "no users in database or bad request",
    });
  }
});

module.exports = usersRouter;
