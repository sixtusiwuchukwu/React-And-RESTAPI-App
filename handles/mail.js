const express = require("express");
const nodemailer = require("nodemailer");

const sndmail = reciever => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.username,
      pass: process.env.password
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
      console.log("unable to send mail");
    } else {
      console.log("signup is sucessful");
    }
  });
};
module.exports = sndmail;
