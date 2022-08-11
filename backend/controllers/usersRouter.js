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

module.exports = usersRouter;
