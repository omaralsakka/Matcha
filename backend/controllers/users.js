const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const userQuery = require("../queries/createUser");

usersRouter.post("/", async (request, response) => {
  const body = request.body;
  console.log("this is body", body);
  if (request.body) {
    response.status(201).json();
  } else {
    console.log("this is error in router");
    return responsee.status(401);
  }
});

module.exports = usersRouter;
