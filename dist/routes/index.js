"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _contactroute = _interopRequireDefault(require("./contactroute"));
var _authroute = _interopRequireDefault(require("./authroute"));
const router = _express.default.Router();
router.use('/contact', _contactroute.default);
router.use('/auth', _authroute.default);
var _default = router;
exports.default = _default;