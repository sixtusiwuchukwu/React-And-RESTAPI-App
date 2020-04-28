const express = require("express");
const nodemailer = require("nodemailer");

const sndmail = reciever => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.mail_username,
      pass: process.env.mail_password
    }
  });
  const mailOption = {
    from: "sixtusiwuchukwu21@gmail.com",
    to: reciever,
    subject: "welcome",
    html: "thanks for subscribing is cool having you around"
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
