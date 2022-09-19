const userRouter = require("express").Router();
const queries = require("../queries/createUser");
const queryTools = require("../queries/queryTools");
const infoQueries = require("../queries/userInfo");
const Mailer = require("../utils/mailer");
const mailsFormat = require("../utils/mailsFormat");
const jwt = require("jsonwebtoken");
const tokenTools = require("../utils/tokenTools");
const getConnections = require("../utils/getConnections");

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

userRouter.post("/forgotpassword", async (request, response) => {
  const body = request.body;

  const fullNameQuery = await infoQueries.selectByEmail(body.email);
  try {
    const verificationCode = await queryTools.insertForgottenPassword(
      body.email
    );
    if (verificationCode.length === 50) {
      const htmlMail = mailsFormat.forgotPasswordMail(
        fullNameQuery[0].fullname,
        verificationCode
      );
      const emailResp = Mailer(
        body.email,
        "Change forgotten password for Matcha",
        htmlMail
      );
      return response.status(200).send(true);
    } else {
      return response.status(200).send(false);
    }
  } catch (error) {
    return response.status(401).json({
      error: "email sending error",
    });
  }
});

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
  try {
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
      return response.status(200).send(false);
    }
  } catch (error) {
    console.error(error.message);
    return response.status(401).json({
      error: "error login",
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

userRouter.post("/infoFilledToken", async (request, response) => {
  const decodedToken = tokenTools.verifyToken(request);
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
        body.email,
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

  if (queryResponse.length) {
    response.status(200).send(queryResponse);
  } else {
    response.status(401).json({
      error: "error updating user info",
    });
  }
});

userRouter.get("/user-connections/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const queryResponse = await queryTools.selectColOneQualifier(
      "connected",
      "connections",
      "user_id",
      id
    );
    if (queryResponse.length) {
      if (queryResponse[0].connections) {
        if (queryResponse[0].connections.length) {
          const users = await getConnections(queryResponse[0].connections);
          if (users.length) {
            response.status(200).send(users);
          } else {
            response.status(401).json({
              error: "users id error in fetching connections",
            });
          }
        } else {
          if (queryResponse[0].connections.length === 0) {
            response.status(200).send([]);
          } else {
            response.status(401).json({
              error: "connections query error",
            });
          }
        }
      } else {
        response.status(200).send([]);
      }
    } else {
      response.status(200).send([]);
    }
  } catch (error) {
    response.status(401).json({
      error: error.message,
    });
  }
});

userRouter.post("/user-status", async (request, response) => {
  const body = request.body;

  if (body) {
    const obj = JSON.parse(body);
    let queryResponse;
    if (obj.userId) {
      const userStatus = await queryTools.selectColOneQualifier(
        "users",
        "status",
        "user_id",
        obj.userId
      );
      switch (obj.status) {
        case "online":
          if (userStatus.status !== "online") {
            queryResponse = await queryTools.updateOneQualifier(
              "users",
              "status",
              "online",
              "user_id",
              obj.userId
            );
          }
          response.status(200).send("online");
          break;
        case "offline":
          if (userStatus.status !== "offline") {
            queryResponse = await infoQueries.setUserOffline(obj.userId);
          }
          response.status(200).send("offline");
          break;
      }
    } else {
      response.status(200).send("cant find user status");
    }
  } else {
    response.status(200).send("cant find user status");
  }
});

userRouter.delete("/delete-user/:id", async (request, response) => {
  const sentId = request.params.id;
  try {
    const deletePictures = await queryTools.deleteOneQualifier(
      "pictures",
      "user_id",
      sentId
    );
    const deleteConnections = await queryTools.deleteOneQualifier(
      "connected",
      "user_id",
      sentId
    );

    const deleteUser = await queryTools.deleteOneQualifier(
      "users",
      "user_id",
      sentId
    );

    const removeUserFromConnectionsColumns =
      await infoQueries.removeFromConnections(sentId);

    response.status(200).send("user-deleted");
  } catch (error) {
    response.status(401).json({
      "delete-user-error": error.message,
    });
  }
});

userRouter.get("/get-notifications/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const queryResponse = await queryTools.selectOneQualifier(
      "notifications",
      "user_id",
      id
    );
    if (queryResponse.rows.length) {
      response.status(200).send(queryResponse.rows);
    } else {
      response.status(200).send([]);
    }
  } catch (error) {
    response.status(404).json({
      "error from get notification": error.message,
    });
  }
});

userRouter.get(
  "/get-recent-notification/:id/:time",
  async (request, response) => {
    const id = request.params.id;
    const time = request.params.time;
    try {
      const queryResponse = await queryTools.selectOneQualifier(
        "notifications",
        "user_id",
        id
      );
      if (queryResponse.rows.length) {
        const recentNotification = queryResponse.rows.filter((n) => {
          return n.notifications.time === time;
        });
        if (recentNotification) {
          response.status(200).send(recentNotification);
        }
      } else {
        response.status(200).send([]);
      }
    } catch (error) {
      response.status(404).json({
        "error from get notification": error.message,
      });
    }
  }
);

userRouter.post("/insert-notifications", async (request, response) => {
  const body = request.body;
  try {
    const queryResponse = await queryTools.insertNotifications(body);
    response.status(200).send(queryResponse);
  } catch (error) {
    response.status(401).json({
      "error from post notification": error.message,
    });
  }
});

userRouter.delete("/clear-notifications", async (request, response) => {
  const decodedToken = tokenTools.verifyToken(request);
  if (!decodedToken) {
    response.status(401).json({
      error: "token error",
    });
  }
  try {
    const queryResponse = await queryTools.deleteOneQualifier(
      "notifications",
      "user_id",
      decodedToken.id
    );
    response.status(200).send(queryResponse);
  } catch (error) {
    response.status(401).json({
      "error from delete notifications": error.message,
    });
  }
});

userRouter.delete("/seen-notifications", async (request, response) => {
  const decodedToken = tokenTools.verifyToken(request);
  if (!decodedToken) {
    response.status(401).json({
      error: "token error",
    });
  }

  try {
    const queryResponse = await queryTools.updateOneQualifier(
      "notifications",
      "status",
      "seen",
      "user_id",
      decodedToken.id
    );
    response.status(200).send(queryResponse);
  } catch (error) {
    response.status(401).json({
      "error from seen notifications": error.message,
    });
  }
});

module.exports = userRouter;
