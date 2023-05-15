"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _contact = _interopRequireDefault(require("../controllers/contact.controller"));
var _auth = _interopRequireDefault(require("../util/auth"));
const {
  validateRegistrationBody,
  validateLoginBody,
  validateContactBody,
  validate
} = require('../util/validation');
const router = _express.default.Router();
router.post('/', _auth.default.verifyToken, validateContactBody(), validate, _contact.default.create);
router.get('/', _auth.default.verifyToken, _contact.default.getAll);
router.get('/:id', _auth.default.verifyToken, _contact.default.get);
router.put('/:id', _auth.default.verifyToken, validateContactBody(), validate, _contact.default.put);
router.delete('/:id', _auth.default.verifyToken, _contact.default.delete);
var _default = router;
exports.default = _default;