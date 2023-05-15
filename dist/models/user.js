"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));
const Schema = _mongoose.default.Schema;
const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    trim: true
  },
  emailVerificationCode: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  }
});
UserSchema.pre("save", function (next) {
  var user = this;
  if (this.isModified("password") || this.isNew) {
    _bcryptNodejs.default.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      _bcryptNodejs.default.hash(user.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});
UserSchema.methods.comparePassword = function (passw, cb) {
  _bcryptNodejs.default.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};
var _default = _mongoose.default.model("User", UserSchema);
exports.default = _default;