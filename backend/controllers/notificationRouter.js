require("dotenv").config();
const notificationRouter = require("express").Router();
const axios = require("axios");

notificationRouter.post("/", async (request, response) => {
  const body = request.body;
  let notifString;
  if (body.type === 1) {
    notifString = "liked your profile!";
  } else if (body.type === 2) {
    notifString = "viewed your profile";
  } else if (body.type === 3) {
    notifString = "sent you a message";
  } else if (body.type === 4) {
    notifString = "liked your profile back! You are now connected.";
  } else if (body.type === 5) {
    notifString = "unliked your profile... You are now unconnected.";
  }
  try {
    const notifResponse = await axios.post(
      "https://api.engagespot.co/v3/notifications",
      {
        notification: {
          title: `${body.from} ${notifString}`,
        },
        recipients: [body.to],
      },
      {
        headers: {
          "X-ENGAGESPOT-API-KEY": process.env.ENGAGESPOT_API,
          "X-ENGAGESPOT-API-SECRET": process.env.ENGAGESPOT_SECRET,
        },
      }
    );
    response.status(200).send(notifResponse);
    //   return response.status(200);
  } catch (error) {
    console.error("this is error from notification: ", error.message);
    response.status(401).json({
      error: error.message,
    });
  }
});

module.exports = notificationRouter;
