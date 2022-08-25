const userRouter = require("express").Router();
const queries = require("../queries/createUser");
const queryTools = require("../queries/queryTools");
const infoQueries = require("../queries/userInfo");
const Mailer = require("../utils/mailer");
const mailsFormat = require("../utils/mailsFormat");
const jwt = require("jsonwebtoken");
const tokenTools = require("../utils/tokenTools");

userRouter.post("/", async (request, response) => {
  const body = request.body;
  const verificationCode = await queries.insertUserVerify(body);
  if (verificationCode.length === 50) {
    const htmlMail = mailsFormat.verificationMail(
      body.fullname,
      verificationCode
    );

    const emailResp = Mailer(body.email, "Verification for Matcha", htmlMail);
    return response.status(200);
  } else {
    return response.status(401).json({
      error: "email sending error",
    });
  }
});

// when user submits as request for a password reset, they are added to a "forgotten" table and sent an email
userRouter.post("/forgotpassword", async (request, response) => {
  const body = request.body;
  const verificationCode = await queryTools.insertForgottenPassword(body.email);
  if (verificationCode.length === 50) {
    const htmlMail = mailsFormat.verificationMail(
      body.fullname,
      verificationCode
    );
    const emailResp = Mailer(
      body.email,
      "Change forgotten password for Matcha",
      htmlMail
    );
    return response.status(200);
  } else {
    return response.status(401).json({
      error: "email sending error",
    });
  }
});

// to insert the new password to the database and remove person from "forgotten" table
userRouter.post("/resetpassword", async (request, response) => {
  const { code, password } = request.body;

  const resetedPassword = await queries.resetUserPassword(code.code, password);
  if (resetedPassword) {
    return response.status(200).send(resetedPassword);
  } else {
    return response.status(401).json({
      error: "password was reset already or incorrect url code",
    });
  }
});

userRouter.post("/verify", async (request, response) => {
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

userRouter.post("/login", async (request, response) => {
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

userRouter.post("/login/tk", async (request, response) => {
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

// const getToken = (request) => {
//   const auth = request.get("authorization");
//   if (auth && auth.toLowerCase().startsWith("bearer")) {
//     return auth.substring(7);
//   }
//   return null;
// };

userRouter.post("/info", async (request, response) => {
  const ip = request.ip;

  const body = request.body;
  const token = tokenTools.getToken(request);

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

userRouter.post("/pictures", async (request, response) => {
  const body = request.body;
  const token = tokenTools.getToken(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or expired" });
  }
  if (body.length) {
    let queryResponse;
    const deleteQueryResponse = await queryTools.deleteOneQualifier(
      "pictures",
      "user_id",
      decodedToken.id
    );
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

// const verifyToken = (request) => {
//   const userToken = getToken(request);
//   const decodedToken = jwt.verify(userToken, process.env.SECRET);
//   if (!decodedToken.id) {
//     return false;
//   }
//   return decodedToken;
// };

userRouter.post("/infoFilledToken", async (request, response) => {
  const decodedToken = tokenTools.verifyToken(request);
  // const oldToken = getToken(request);
  // const decodedToken = jwt.verify(oldToken, process.env.SECRET);
  if (!decodedToken) {
    return response.status(401).json({ error: "new token generating error" });
  }
  const userForToken = {
    username: decodedToken.username,
    id: decodedToken.id,
    infoFilled: true,
    name: decodedToken.fullname,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  return response.status(200).send({
    token,
  });
});

userRouter.get("/pictures/:id", async (request, response) => {
  const id = request.params.id;

  const queryResponse = await infoQueries.getUserPictures(id);
  if (queryResponse.rows.length) {
    const pictures = queryResponse.rows.map((row) => row.picture);
    return response.status(200).send(pictures[0]);
  } else {
    return response.status(401).json({
      error: "image does not exist",
    });
  }
});

// used to get usernames and email from both tables users and user_verify
userRouter.post("/verify-username-email", async (request, response) => {
  const body = request.body;
  let info;
  if (body.type === "username") {
    info = await queryTools.unionOneQualifier(body.type, "user_verify");
  } else if (body.type === "email") {
    info = await queryTools.unionOneQualifier(body.type, "user_verify");
  }
  if (info) {
    return response.status(200).send(info);
  } else {
    return response.status(404).json({
      error: "no users in database or bad request",
    });
  }
});

userRouter.post("/settings", async (request, response) => {
  const body = request.body;
  const result = await infoQueries.insertSettings(body);
  if (result) {
    return response.status(200).send(result);
  } else {
    return response.status(404).json({
      error: "issue with inserting new information by settings",
    });
  }
});

userRouter.post("/verify-password", async (request, response) => {
  const body = request.body;
  try {
    const oldPassword = await infoQueries.getPassword(body);
    return response.status(200).send(oldPassword);
  } catch (error) {
    return response.status(404).json({
      error: "bad request",
    });
  }
});

userRouter.post("/change-email", async (request, response) => {
  const body = request.body;
  try {
    const verificationCode = await queryTools.emailChangeRequest(body);
    if (verificationCode.length === 50) {
      const emailResp = Mailer(
        body.oldEmail,
        "Verification to change Matcha users E-mail",
        `Please click on the following link to verify email: http://localhost:3000/api/verify-email/code=${verificationCode}`
      );
    }
    return response.status(200).send(verificationCode);
  } catch (error) {
    return response.status(404).json({
      error: "user was not insterted into verify_user (email change request)",
    });
  }
});

userRouter.post("/verify-change-email", async (request, response) => {
  const body = request.body;
  const verifyUser = await queryTools.changeEmail(body.code);
  if (verifyUser) {
    return response.status(200).send(verifyUser);
  } else {
    return response.status(401).json({
      error: "user was already verified",
    });
  }
});

userRouter.post("/edit-user-data", async (request, response) => {
  const decodedToken = tokenTools.verifyToken(request);
  const body = request.body;
  let queryResponse;
  if (!decodedToken) {
    response.status(401).json({
      error: "token error",
    });
  }
  console.log("decoded token id: ", decodedToken.id);
  switch (body.infoType) {
    case "bio":
      queryResponse = await queryTools.updateOneQualifier(
        "users",
        "bio",
        body.newBio,
        "user_id",
        decodedToken.id
      );
      break;
    case "tags":
      const deleteResponse = await queryTools.updateOneQualifier(
        "users",
        "tags",
        "{}",
        "user_id",
        decodedToken.id
      );
      queryResponse = await queryTools.updateOneQualifier(
        "users",
        "tags",
        `{${body.tags}}`,
        "user_id",
        decodedToken.id
      );
      break;
  }

  // const queryResponse = await queryTools.updateOneQualifier(
  //   "users",
  //   "bio",
  //   body.newBio,
  //   "user_id",
  //   decodedToken.id
  // );

  if (queryResponse.length) {
    response.status(200).send(queryResponse);
  } else {
    response.status(401).json({
      error: "error updating user info",
    });
  }
});

/* userRouter.post("/user-info", async (request, response) => {
	const body = request.body;
	const user_id = body.user_id;
	try {
		const userInfo = await queryTools.selectOneQualifier("users", "user_id", user_id);
		return response.status(200).send(userInfo);
	} catch (error) {
		return response.status(404).json({
			error: "user was not found or bad request"
		});
	}
}); */

module.exports = userRouter;
