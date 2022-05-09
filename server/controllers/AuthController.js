const UserModel = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
require('dotenv').config();
const invalidPassword = require('../util/validatePassword')
const isValidDate = require('../util/isValidDate')

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
    const maxFailedLogins = 3;
    const lockOutTime = 1000 * 30; // default is milliseconds so this is 30 seconds
    const user = await UserModel.findOne({ username: req.body.username });
    const currTime = new Date();

    // user does not exist
    if (!user) return res.status(401).json({ message: "Invalid username" });

    // if user is locked out and not enough time has passed
    if (isValidDate(user.lockedOutAt) && (currTime - user.lockedOutAt < lockOutTime)) {
      console.log("User is locked out")
      return res.status(401).json({ message: "User is locked out" });
    }

    // compare password
    const checkpassword = await bcrypt.compare(req.body.password, user.password);

    // Successful sign in, password is correct
    if (checkpassword) {
      // Set failed attempts to 0 and unlock user if previously locked
      UserModel.findByIdAndUpdate(user._id, 
        {
          failedLoginAttempts: 0,
          lockedOutAt: ''
        },
        (err, _data) => {
          if (err) return res.status(500).send({ message: `Error processing request: ${err}`});
        })

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
    }

    // incorrect password
    else {
      // too many unsuccessful attempts, lock user out
      if (user.failedLoginAttempts >= maxFailedLogins) {
        UserModel.findByIdAndUpdate(user._id, 
          {
            lockedOutAt: new Date(),
          },
          (err, _data) => {
            if (err) {
              return res.status(500).send({ message: `Error processing request: ${err}`})
            } else {
              return res.status(401).send(
                { message: `Too many unsuccesful attempts, you have been locked out for ${lockOutTime/1000} seconds`}
              )
            }
          })
      } else {
        // increase failed attempts number and return 'incorrect password'
        UserModel.findByIdAndUpdate(user._id, 
          {
            failedLoginAttempts: user.failedLoginAttempts + 1
          },
          (err, _data) => {
            if (err) return res.status(500).send({ message: `Error processing request: ${err}`});
            else return res.status(401).send({ message: `Incorrect password`});
          })
      }      
    }
  },

  register: async (req, res) => {
    const user = req.body;      
    const takenUsername = await UserModel.findOne({ username: user.username });
    const takenEmail = await UserModel.findOne({ email: user.email });

    if (takenUsername) {
      return res.status(400).json({ message: "Username already taken" });
    } else if (takenEmail) {
      return res.status(400).json({ message: "Email already exists" });
    } else {

      // Password validation
      if (invalidPassword(req.body.password)) {
        return res.status(400).json({ message: invalidPassword(req.body.password) });
      }

      user.password = await bcrypt.hash(req.body.password, 10);
      user.email = user.email.toLowerCase();
      user.username = user.username.toLowerCase();

      const token = jwt.sign(
        { username: user.username },
        process.env.VERIFY_EMAIL_KEY, 
        { expiresIn: 86400 }
      )
      user.verifyEmailLink = token;
      const dbUser = new UserModel(user);
      await dbUser.save()
        .catch(err => {
          return res.status(400).send({ message: `Error: could not create user: ${err}` })
        })

      
      const emailData = {
        from: "rackrace@zohomail.com",
        to: user.email,
        subject: "RackRace Email Verification Link",
        html:`
          <h2>Please click on the link to verify your account</h2>
          <p>${process.env.CLIENT_URL}/users/${dbUser._id}/verify/${token}</p>
        `
      }

      transporter.sendMail(emailData, (err, info) => {
        if (err) return res.status(500).send({ message: `Error sending email: ${err}` })
        else {
          return res.status(200).send({ 
            message: "Email has been sent. Please follow directions to verify your email",
            info: info,
          });
        }
      });
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

    // Password validation
    if (invalidPassword(newPassword)) {
      return res.status(400).json({ message: invalidPassword(newPassword) });
    }

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
  },

  verifyEmail: async (req, res) => {
    const { id, token } = req.params;
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    if (token) {
      jwt.verify(token, process.env.VERIFY_EMAIL_KEY, (err, decodedData) => {
        if (err) return res.status(401).send({ message: "Incorrect or expired token" });

        UserModel.findByIdAndUpdate(id, 
          {
            verified: true,
          },
          (err, data) => {
            if (err) {
              return res.status(400).send({ message: err});
            } else {
              console.log(data)
              return res.status(200).send({ message: "Email succesfully verified!" });
            }
          })
      })
    } else {
      return res.status(401).send({ message: "Authentication error" })
    }


  }
}

module.exports = AuthController;