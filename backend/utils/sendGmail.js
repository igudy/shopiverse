const nodemailer = require("nodemailer");
const MailGen = require("mailgen");

const sendEmail = async (subject, send_to, template, reply_to, cc) => {
  // Create Email Transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST_GOOGLE,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER_GOOGLE,
      pass: process.env.EMAIL_PASS_GOOGLE,
    },
    // tls: {
    //   rejectUnauthorized: false,
    // },
  });

  // Create Template With MailGen
  const mailGenerator = new MailGen({
    theme: "salted",
    product: {
      name: "Shopiverse App",
      link: "https://shopiverse-client.vercel.app/",
    },
  });
  const emailTemplate = mailGenerator.generate(template);
  require("fs").writeFileSync("preview.html", emailTemplate, "utf8");

  // Options f0r sending email
  const options = {
    from: process.env.EMAIL_USER_GOOGLE,
    to: send_to,
    replyTo: reply_to,
    subject,
    html: emailTemplate,
    cc,
  };

  // Send Email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;
