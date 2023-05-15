"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const jwt = require("jsonwebtoken");
class authManager {
  async verifyToken(req, res, next) {
    try {
      // Gather the jwt access token from the request header
      const authHeader = await req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res.status(401).json({
        message: "No token provided!"
      }); // if there isn't any token

      jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        console.log(err);
        if (err) return res.status(403).json({
          success: false,
          msg: "Unauthorized."
        });
        req.user = user;
        next(); // pass the execution off to whatever request the client intended
      });
    } catch (error) {
      return res.status(401).json({
        message: "Your token has expired."
      });
    }
  }
}
var _default = new authManager();
exports.default = _default;