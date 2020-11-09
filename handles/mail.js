const express = require("express");
const nodemailer = require("nodemailer");

const sndmail = (reciever) => {
  console.log(reciever);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
<<<<<<< HEAD
      type: "login",
      user: "sixtusiwuchukwu21@gmail.com",
      pass: "08100371154",
    },
=======
      user: process.env.mail_username,
      pass: process.env.mail_password
    }
>>>>>>> 3f86b8c0fd82976902c603c65c4c39c5777c4c75
  });
  const mailOption = {
    from: "onyeozi@gmail.com",
    to: reciever,
    subject: "welcome",
    html: ` <div style="color:blue; background:yellow;">
          Hello ${reciever} thanks for subscribing is cool having you around
        </div>`,
  };
  transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      console.log("unable to send mail", err);
    } else {
      console.log("signup is sucessful", info);
    }
  });
};
module.exports = sndmail;

// sndmail("sixtusiwuchukwu21@gmail.com");
