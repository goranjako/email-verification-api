import User from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

class AuthService {
  //reister service
  static async register(data) {
    try {
      const user = new User(data);
      const obj = await user.save();
      return obj;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
