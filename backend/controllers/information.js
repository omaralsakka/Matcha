const infoRouter = require("express").Router();
const queries = require("../queries/userInfo");
const jwt = require("jsonwebtoken");

const getToken = (request) => {
	const auth = request.get("authorization");
	if (auth && auth.toLowerCase().startsWith("bearer")) {
		return auth.substring(7);
	}
	return null;
};

infoRouter.post("/info", async (request, response) => {
	//console.log("this is request : ", request);
	const body = request.body;
	//console.log("this is body :", body);

	const token = getToken(/* token?? */);
	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: "token missing or expired" });
	};

	const userInfo = await queries.insertUserInfo(body);
	if (userInfo) {
	  return response.status(200).send(userInfo);
	} else {
	  return response.status(401).json({
		error: "some kind of issue, lets get back to this",
	});
	}
});

module.exports = infoRouter;