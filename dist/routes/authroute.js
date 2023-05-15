"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = _interopRequireDefault(require("../controllers/auth.controller"));
const {
  validateRegistrationBody,
  validateLoginBody,
  validateContactBody,
  validate
} = require("../util/validation");
const router = _express.default.Router();
router.post("/register", validateRegistrationBody(), validate, _auth.default.register);
router.post("/login", validateLoginBody(), validate, _auth.default.login);
router.route("/verify").post(_auth.default.verify);
var _default = router;
exports.default = _default;