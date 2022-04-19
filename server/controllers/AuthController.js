const UserModel = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  port: 465,               // true for 465, false for other ports
  host: "smtp.zoho.com",
    auth: {
      user: 'rackrace@zohomail.com',
      pass: 'R@ckR@c3!',
    },
  secure: true,
});

const AuthController = {
  login: async (req, res) => {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) return res.status(400).json({ message: "Invalid username" });

    const checkpassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkpassword) return res.status(400).json({ message: "Incorrect password" });

    const payload = {
      id: user._id.toString(),
      username: user.username,
    }
    jwt.sign(
      payload,
      process.env.JWT_SECRET, 
      { expiresIn: 86400 },
      (err, token) => {
        if (err) return res.json({ message: err });
        return res.json({
          user: user._doc,
          token: "Bearer " + token
        });
      }
    );
  },

  register: async (req, res) => {
    const user = req.body;      
    const takenUsername = await UserModel.findOne({ username: user.username });
    const takenEmail = await UserModel.findOne({ email: user.email });

    if (takenUsername) {
      res.status(400).json({ message: "Username already taken" });
    } else if (takenEmail) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      user.password = await bcrypt.hash(req.body.password, 10);
      user.email = user.email.toLowerCase();
      user.username = user.username.toLowerCase();
      const dbUser = new UserModel(user);
      dbUser.save();
      res.json({ message: "Success" });
    }    
  },

  forgotPassword: async (req, res) => {
    const { email } = req.body;

    UserModel.findOne({ email }, (err, user) => {
      if (err) return res.status(400).send({ message: err.message });
      else if (!user) return res.status(400).send({ message: "email not found" });

      const token = jwt.sign(
        { _id: user._id },
        process.env.RESET_PASSWORD_KEY, 
        { expiresIn: 86400 }
      )
      const data = {
        from: "rackrace@zohomail.com",
        to: email,
        subject: "RackRace Reset Password Link",
        html:`
          <h2>Please click on the link to reset your password</h2>
          <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
        `
      }

      return UserModel.updateOne({ resetLink: token }, (err, success) => {
        if (err) return res.status(400).send({ message: err.message });

        transporter.sendMail(data, (err, info) => {
          if (err) return res.status(500).send({ message: `Error sending email: ${err}` })
          else {
            return res.status(200).send({ 
              message: "Email has been sent. Please follow directions to reset your password",
              info: info,
            });
          }
        });
      })
    })
  },

  resetPassword: async (req, res) => {
    const { resetLink, newPassword } = req.body;
    if (!newPassword) return res.status(400).send({ message: "Must specify new password" });
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (resetLink) {
      jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, (err, decodedData) => {
        if (err) return res.status(401).send({ message: "Incorrect or expired token" });

        UserModel.updateOne({ resetLink }, 
          {
            password: hashedPassword,
          },
          (err, data) => {
            if (err) {
              return res.status(400).send({ message: err});
            } else {
              return res.status(200).send({ message: "Password succesfully updated!" });
            }
          })
      })
    } else {
      return res.status(401).send({ message: "Authentication error" })
    }
  }
}

module.exports = AuthController;