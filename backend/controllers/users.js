const usersRouter = require("express").Router();
const queries = require("../queries/createUser");
const Mailer = require("../utils/mailer");

usersRouter.post("/", async (request, response) => {
  const body = request.body;
  const verificationCode = await queries.insertUserVerify(body);
  if (verificationCode.length === 50) {
    const emailResp = Mailer(
      body.email,
      "Verification for Matcha",
      `Please click on the following link to be verified: http://localhost:3000/api/verify/code=${verificationCode}`
    );
  } else {
    console.error("email error, check usersRouter.post");
  }
});

usersRouter.post("/verify/", async (request, response) => {
  const body = request.body;
  const verifyUser = await queries.verifyUser(body.code);
  console.log("this is verifyUser response: ", verifyUser);
});

module.exports = usersRouter;
