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

module.exports = usersRouter;
