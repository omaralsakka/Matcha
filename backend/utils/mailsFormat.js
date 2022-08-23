const verificationMail = (fullName, verificationCode) => {
  const htmlMail = `<h5>Dear ${fullName},</h5><p>Thank you for joining Matcha!<br />Please click on the following link to be verified: <a href="http://localhost:3000/api/verify/code=${verificationCode}" />Verification Link</a><br />Matcha operations team.</p>`;
  return htmlMail;
};

const forgotPasswordMail = (fullName, verificationCode) => {
  const htmlMail = `<h5>Dear ${fullName},</h5><p>Please click on the following link to create a new password: <a href="http://localhost:3000/api/forgotpassword/code=${verificationCode}" />Verification Link</a><br />Matcha operations team.</p>`;
  return htmlMail;
};

const reportMail = (fullName) => {
  const htmlMail = `<h5>Dear ${fullName},</h5><p>we would like to inform you that your account has been reported.<br />As for this action we have deleted your account.<br /><br />Matcha operations team.</p>`;
  return htmlMail;
};

module.exports = { verificationMail, reportMail, forgotPasswordMail };
