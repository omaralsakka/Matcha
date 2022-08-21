const usersRouter = require("express").Router();
const queryTools = require("../queries/queryTools");
const usersQueries = require("../queries/userInfo");

usersRouter.get("/all", async (request, response) => {
  const queryResponse = await queryTools.selectAllTable("users");

  if (queryResponse.rows.length) {
    response.status(200).send(queryResponse.rows);
  } else {
    response.status(401).json({
      error: "fetching users query error",
    });
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

// working on this
usersRouter.get("/pictures/:id", async (request, response) => {
  const userId = request.params.id;
  const queryResponse = queryTools.selectOneQualifier(
    "pictures",
    "user_id",
    userId
  );

  if (queryResponse.length) {
    response.status(200).send(queryResponse);
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
  }
});

// working on this now
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

  // There should be rule if reports are 3 for example,
  // the account should be deleted and an email sent to the user.
  if (insertReportQuery.length) {
    if (insertReportQuery[0].reports_by.length >= 3) {
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

module.exports = usersRouter;
