"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _contact = _interopRequireDefault(require("../models/contact"));
class ContactService {
  static async getAll() {
    try {
      return await _contact.default.find();
    } catch (error) {
      throw error;
    }
  }
  static async getById(id) {
    try {
      const contact = await _contact.default.findById(id);
      return contact;
    } catch (error) {
      throw error;
    }
  }
  static async addContact(data) {
    try {
      const contact = new _contact.default(data);
      return await contact.save();
    } catch (error) {
      throw error;
    }
  }
  static async update(id, data) {
    try {
      const contact = await _contact.default.findById({
        _id: id
      });
      contact.set(data);
      const result = await contact.save();
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async delete(id) {
    try {
      return await _contact.default.deleteOne(id);
    } catch (error) {
      throw error;
    }
  }
}
var _default = ContactService;
exports.default = _default;