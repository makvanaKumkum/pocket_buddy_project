const mailer = require("nodemailer");

const sendingMail = async (to, subject, text) => {
  const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "krupalmakvana681@gmail.com",
      pass: "jcxx tyvn htdj scbk",
    },
  });

  const mailOptions = {
    from: "krupalmakvana681@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  const mailresponse = await transporter.sendMail(mailOptions);
  console.log(mailresponse);
  return mailresponse;
};

module.exports = {
  sendingMail,
};
