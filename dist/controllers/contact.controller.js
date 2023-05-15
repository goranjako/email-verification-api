"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _contact = _interopRequireDefault(require("../services/contact.service"));
class contactController {
  // Get all
  async getAll(req, res) {
    try {
      const docs = await _contact.default.getAll();
      return res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
  // Insert
  async create(req, res, next) {
    try {
      const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        userId: req.body.userId
      };
      const obj = await _contact.default.addContact(contact);
      return res.status(200).json({
        success: true,
        message: " Contact is Created successfully."
      });
    } catch (err) {
      res.status(422).json(err.message);
    }
  }

  // Get by id
  async get(req, res) {
    try {
      const obj = await _contact.default.getById({
        _id: req.params.id
      });
      if (obj) {
        return res.status(200).json(obj);
      } else {
        return res.status(400).json({
          error: "contact not found"
        });
      }
    } catch (err) {
      return res.status(400).json({
        error: "contact not found"
      });
    }
  }

  // Update by id
  async put(req, res) {
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      userId: req.body.userId
    };
    const id = req.params.id;
    try {
      const contact = await _contact.default.update(id, data);
      return res.status(200).json({
        success: true,
        message: " contact is Updated successfully."
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "contact does not exist!"
      });
    }
  }
  // Delete by id
  async delete(req, res) {
    try {
      await _contact.default.delete({
        _id: req.params.id
      });
      return res.json({
        success: true,
        message: " contact is Deleted successfully."
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "contact does not exist!"
      });
    }
  }
}
var _default = new contactController();
exports.default = _default;