const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const queries = require("../queries/createUser");

usersRouter.post("/", async (request, response) => {
  const body = request.body;
  const query = await queries.insertUserVerify(body);
  console.log(query);
});

module.exports = usersRouter;
