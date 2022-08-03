/* const bcrypt = require("bcrypt"); */
const usersRouter = require("express").Router();
const insertUser = require("../queries/createUser");

usersRouter.post("/", async (request, response) => {
  const body = request.body;
  const query = await insertUser(body);
  console.log(query);
});

module.exports = usersRouter;
