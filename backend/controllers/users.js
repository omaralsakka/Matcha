const usersRouter = require("express").Router();
const queries = require("../queries/createUser");
const Mailer = require("../utils/mailer");
const jwt = require("jsonwebtoken");

usersRouter.post("/", async (request, response) => {
	var ip = request.ip;

	console.log(ip);

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

usersRouter.post("/verify/", async (request, response) => {
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
    const userForToken = {
      username: loggedUser.username,
      id: loggedUser.user_id,
    };
    const token = jwt.sign(userForToken, process.env.SECRET);
    return response.status(200).send({
      token,
      username: loggedUser.username,
      name: loggedUser.fullname,
    });
  } else {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }
});

module.exports = usersRouter;
