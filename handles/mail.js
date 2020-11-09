const express = require("express");
const nodemailer = require("nodemailer");

const sndmail = (reciever) => {
  console.log(reciever);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      type: "login",
      user: "sixtusiwuchukwu21@gmail.com",
      pass: "08100371154",
    },
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
