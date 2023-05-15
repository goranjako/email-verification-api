"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _user = _interopRequireDefault(require("../models/user"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _otpgenerator = _interopRequireDefault(require("../util/otpgenerator"));
_dotenv.default.config();
class Auth {
  //register
  async register(req, res) {
    const otp = _otpgenerator.default.generateOTP(6);
    console.log(otp);
    try {
      if (!req.body.email || !req.body.password) {
        res.json({
          success: false,
          msg: "Please pass email and password."
        });
      }
      let user = await _user.default.findOne({
        email: req.body.email
      });
      if (user) {
        return res.status(400).send("User with given email already exist!");
      } else {
        const newUser = {
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          emailVerificationCode: otp
        };
        let transporter = _nodemailer.default.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          // true for 465, false for other ports 587
          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD // generated ethereal password
          }
        });
        /*
            let info = await transporter.sendMail({
                to: newUser.email, // list of receivers${otp} 
                subject: 'Email verifaction',
                html: `<p>Enter the otp:<span style="color: tomato;font-size: 25px;letter-spacing: 2px;"> <b> ${otp} </b> </span>to verify your email address</p>`
                
              }); */
        const data = new _user.default(newUser);
        const obj = await data.save();
        return res.status(200).json({
          message: "An Email sent to your account please verify",
          userId: obj._id
        });
      }
    } catch (error) {
      res.status(500).send("An error occured");
    }
  }
  async verify(req, res) {
    const {
      id,
      otp
    } = req.body;
    if (!otp || !id) {
      res.status(400).json({
        error: "Please Enter Your OTP "
      });
    }
    try {
      const user = await _user.default.findOne({
        _id: id
      });
      if (user.emailVerificationCode === otp) {
        if (user.verified) throw new UnauthorizedError('Email already verified.');else {
          user.verified = true;
          user.emailVerificationCode = undefined;
          const users = await user.save();
          const token = _jsonwebtoken.default.sign(users.toJSON(), process.env.SECRET_TOKEN, {
            expiresIn: "10m"
          });
          // return the information including token as JSON
          return res.json({
            success: true,
            msg: " User is Created successfully.",
            token: token
          });
        }
      } else {
        await _user.default.deleteOne(user._id);
        res.status(400).json({
          error: "Verification code is wrong"
        });
      }
    } catch (error) {
      res.status(400).json({
        error: "Invalid Details"
      });
    }
  }

  //login
  async login(req, res) {
    try {
      const user = await _user.default.findOne({
        email: req.body.email
      });
      if (!user) {
        res.status(401).send({
          success: false,
          msg: "Authentication failed. User not found."
        });
      }
      if (user.verified === false) {
        res.status(401).send({
          success: false,
          msg: "User not verify"
        });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            const token = _jsonwebtoken.default.sign(user.toJSON(), process.env.SECRET_TOKEN, {
              expiresIn: "10m"
            });
            // return the information including token as JSON
            return res.json({
              success: true,
              msg: "Successful login",
              token: token
            });
          } else {
            return res.status(422).send({
              success: false,
              msg: "Authentication failed. Wrong password."
            });
          }
        });
      }
    } catch (err) {
      res.status(422).json({
        success: false,
        msg: "User already exsist."
      });
    }
  }
}
var _default = new Auth();
exports.default = _default;