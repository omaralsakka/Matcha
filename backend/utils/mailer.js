require("dotenv").config();
const nodemailer = require("nodemailer");

const Mailer = (userEmail, emailSubject, emailBody) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  let mailOptions = {
    from: process.env.MATCHAEMAIL,
    to: userEmail,
    subject: emailSubject,
    text: emailBody,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.error("Error: ", err);
      return err;
    } else {
      console.log("Email sent succesfully to ", userEmail);
      return true;
    }
  });
};

module.exports = Mailer;
