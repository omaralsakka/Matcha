const usersRouter = require("express").Router();
const queryTools = require("../queries/queryTools");
const usersQueries = require("../queries/userInfo");
const userQueries = require("../queries/createUser");
const Mailer = require("../utils/mailer");
const mailsFormat = require("../utils/mailsFormat");
const filterUsers = require("../utils/FilterUsers");
const passwordTools = require("../utils/cryptPassword");
const distanceTool = require("../utils/distanceTool");

usersRouter.post("/all", async (request, response) => {
  const body = request.body;
  const queryResponse = await queryTools.selectAllWithFilter(body);
  response.status(200).send(queryResponse);
});

usersRouter.post("/country", async (request, response) => {
  const body = request.body;
  const queryResponse = await queryTools.selectOneQualifier(
    "users",
    "country",
    `'${body.country}'`
  );
  if (queryResponse.rows.length) {
    const filteredUsers = filterUsers(queryResponse.rows, body.user);
    response.status(200).send(filteredUsers);
  } else {
    response.status(200).send([]);
  }
});

usersRouter.get("/profileimage", async (request, response) => {
  const queryResponse = await usersQueries.getProfilePictures();

  if (queryResponse.rows.length) {
    response.status(200).send(queryResponse.rows);
  } else {
    response.status(401).json({
      error: "fetching users profile pictures query error",
    });
  }
});

usersRouter.get("/user-pictures/:id", async (request, response) => {
  const userId = request.params.id;
  const queryResponse = await queryTools.selectOneQualifier(
    "pictures",
    "user_id",
    userId
  );
  if (queryResponse.rows.length) {
    response.status(200).send(queryResponse.rows);
  } else {
    response.status(404).json({
      error: "pictures not found",
    });
  }
});

usersRouter.post("/likeuser", async (request, response) => {
  const { likedUserId, likedById } = request.body;
  const queryResponseLiked = await usersQueries.updateArrayQuery(
    "users",
    "liked",
    likedUserId,
    likedById
  );
  if (queryResponseLiked.length) {
    const queryResponseLikedBy = await usersQueries.updateArrayQuery(
      "users",
      "liked_by",
      likedById,
      likedUserId
    );
    if (queryResponseLikedBy.length) {
      const queryResponseConnected = await usersQueries.updateConnectedQuery(
        likedById,
        likedUserId
      );
    }
    if (queryResponseLikedBy.length) {
      response.status(200).send(queryResponseLikedBy);
    }
  } else {
    response.status(401).json({
      error: "liking user error",
    });
  }
});

usersRouter.post("/dislikeuser", async (request, response) => {
  const { likedUserId, likedById } = request.body;

  const queryResponse = await usersQueries.disLikeUserQuery(
    likedUserId,
    likedById
  );

  if (queryResponse.rows.length) {
    response.status(200).send(queryResponse.rows);
  } else {
    response.status(401).json({
      error: "disliking user error",
    });
  }
});

usersRouter.post("/viewedUser", async (request, response) => {
  const { viewedUser, loggedUser } = request.body;

  const queryResponse = await usersQueries.checkColArrayValue(
    "users",
    viewedUser,
    loggedUser,
    "views"
  );

  if (!queryResponse.length) {
    const insertQueryResponse = await usersQueries.updateArrayQuery(
      "users",
      "views",
      loggedUser,
      viewedUser
    );

    if (insertQueryResponse.length) {
      response.status(200).send(insertQueryResponse);
    } else {
      response.status(401).json({
        error: "inserting view error",
      });
    }
  } else {
    response.status(200).send({ message: "user viewed" });
  }
});

usersRouter.post("/blockuser", async (request, response) => {
  const { loggedUser, blockedUser } = request.body;

  const checkQueryResponse = await usersQueries.checkColArrayValue(
    "users",
    blockedUser,
    loggedUser,
    "blocked"
  );

  if (!checkQueryResponse.length) {
    const insertQueryResponse = await usersQueries.updateArrayQuery(
      "users",
      "blocked",
      blockedUser,
      loggedUser
    );
    if (insertQueryResponse.length) {
      const insertSecondQueryResponse = await usersQueries.updateArrayQuery(
        "users",
        "blocked_by",
        loggedUser,
        blockedUser
      );
      if (insertSecondQueryResponse.length) {
        response.status(200).send(insertQueryResponse);
      }
    } else {
      response.status(401).json({
        error: "blocking user error",
      });
    }
  } else {
    response.status(200).send({ message: "user already blocked" });
  }
});

usersRouter.post("/report-user", async (request, response) => {
  const { loggedUserId, reportedUser } = request.body;
  const insertReportQuery = await usersQueries.updateArrayQuery(
    "users",
    "reports_by",
    loggedUserId,
    reportedUser
  );

  if (insertReportQuery.length) {
    if (insertReportQuery[0].reports_by.length >= 3) {
      const htmlMail = mailsFormat.reportMail(insertReportQuery[0].fullname);
      const mailResponse = Mailer(
        insertReportQuery[0].email,
        "Account reported",
        htmlMail
      );
      const deleteReportedQuery = await queryTools.deleteOneQualifier(
        "users",
        "user_id",
        reportedUser
      );
      const deletePicturesQuery = await queryTools.deleteOneQualifier(
        "pictures",
        "user_id",
        reportedUser
      );

      response.status(200).send([]);
    } else {
      response.status(200).send(insertReportQuery);
    }
  } else {
    response.status(401).json({
      error: "reporting router error",
    });
  }
});

usersRouter.post("/random-users", async (request, response) => {
  const { results } = request.body;
  const sexPref = ["straight", "gay", "bi"];
  const cryptedPass = await passwordTools.cryptPassword("Omarluke@4");
  const tags = [
    ["vegan", "happy"],
    ["cool", "smart", "coding"],
    ["funny", "hungry", "chill", "love"],
    ["movies", "cats"],
    ["dogs", "traveling", "party"],
    ["coffee", "winter", "friends"],
    ["spanish", "spicey", "lovable"],
    ["arab", "funny", "honest", "love"],
  ];
  if (results.length) {
    let i = 0;
    let x = 0;
    let male = 1;
    let female = 1;
    let img;
    let img2;
    for (let index = 0; index < results.length; index++) {
      if (i > 2) {
        i = 0;
      }
      if (x > 7) {
        x = 0;
      }
      if (male > 12) {
        male = 1;
      }
      if (female > 12) {
        female = 1;
      }
      switch (results[index].gender) {
        case "male":
          img = `./m${male}.jpg`;
          img2 = `./m${male}-2.jpg`;
          male++;
          break;
        case "female":
          img = `./f${female}.jpg`;
          img2 = `./f${female}-2.jpg`;
          female++;
          break;
      }
      const userInfo = {
        username: results[index].login.username,
        email: results[index].email,
        fullname: `${results[index].name.first} ${results[index].name.last}`,
        password: cryptedPass,
        age: results[index].dob.age,
      };
      const queryResponse = await userQueries.insertUser(userInfo);
      const coords = [
        parseFloat(results[index].location.coordinates.latitude),
        parseFloat(results[index].location.coordinates.longitude),
      ];
      const userData = {
        gender: results[index].gender,
        sexualPreference: sexPref[i],
        bio: "I am a testing user. And I am here to share the love with everyone and make sure that I am the best company anyone can have and will be loveable in best and worst. I am imperfect because I am human being",
        tags: tags[x],
        location: `${results[index].location.city}, ${results[index].location.country}`,
        coords,
      };
      const dataQueryResponse = await usersQueries.insertUserInfo(
        userData,
        queryResponse.rows[0].user_id,
        "192.166.125.62"
      );
      const picturesQueryResponse = await usersQueries.insertUserPictures(
        img,
        queryResponse.rows[0].user_id
      );
      const picturesQueryResponse2 = await usersQueries.insertUserPictures(
        img2,
        queryResponse.rows[0].user_id
      );
      i++;
      x++;
    }
  }
});

usersRouter.post("/distance", async (request, response) => {
  const body = request.body;
  const distanceResponse = distanceTool(body);
  if (distanceResponse.length) {
    response.status(200).send(distanceResponse);
  } else {
    response.status(404).json({
      error: "distance not possible to calculate",
    });
  }
});

usersRouter.get("/user-id/:id", async (request, response) => {
  const id = parseInt(request.params.id);
  const queryResponse = await queryTools.selectOneQualifier(
    "users",
    "user_id",
    id
  );
  if (queryResponse.rows) {
    response.status(200).send(queryResponse.rows);
  } else {
    response.status(404).json({
      error: "user not found",
    });
  }
});

usersRouter.post("/chatrooms", async (request, response) => {
  const body = request.body;
  const params1 = [body.user_id, body.match_user_id];
  const params2 = [body.match_user_id, body.user_id];
  const queryResponse = await queryTools.selectChats(params1, params2);
  if (queryResponse.length === 0) {
    const insertResponse = await queryTools.insertChat(params1);
    if (insertResponse.length) {
      response.status(200).send(insertResponse[0]);
    } else {
      response.status(404).json({
        error: "was not able to insert new chatroom",
      });
    }
  } else {
    response.status(200).send(queryResponse[0]);
  }
});

usersRouter.post("/insert-chat-messages", async (request, response) => {
  const body = request.body;
  const queryResponse = await queryTools.saveChatMessage(body);
  if (queryResponse.length) {
    response.status(200).send(queryResponse[0]);
  } else {
    response.status(404).json({
      error: "error occured when inserting new messages",
    });
  }
});

usersRouter.post("/get-chat-messages", async (request, response) => {
  const body = request.body;
  const queryResponse = await queryTools.getChatMessages(body);
  if (queryResponse.length) {
    response.status(200).send(queryResponse[0]);
  } else {
    response.status(404).json({
      error: "error occured when fetching old messages",
    });
  }
});

usersRouter.post("/clear-chat", async (request, response) => {
  const ids = request.body;
  try {
    const queryResponse = await usersQueries.clearChat(ids);
    response.status(200).send(queryResponse);
  } catch (error) {
    console.error(error.message);
    response.status(401).json({
      error: error.message,
    });
  }
});

usersRouter.get("/user-profile-picture/:id", async (request, response) => {
  const id = request.params.id;

  try {
    const queryResponse = await queryTools.selectLimitOneQualifier(
      "pictures",
      "user_id",
      id
    );
    response.status(200).send(queryResponse[0]);
  } catch (error) {
    console.error("error in fetching profile picture: ", error.message);
    response.status(404).json({
      error: "user profile picture error",
    });
  }
});

usersRouter.get("/check-users/:id", async (request, response) => {
  const userId = request.params.id
  try {
    if (userId){
      const queryResponse = await queryTools.selectOneQualifier('users', 'user_id', userId)
      if (queryResponse.rows.length){
        response.status(200).send(true)
      } else {
        response.status(200).send(false)
      }
    }
  } catch (error) {
    console.error("error in checking store users")
    response.status(404).json({
      error: error.message,
    });
  }
})

module.exports = usersRouter;
