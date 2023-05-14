import User from "../models/user";

class UserService {

  static async getAll() {
    try {
       const users= await User.find();
       return users;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
        const user= await User.findById(id);
        return user;
    } catch (error) {
      throw error;
    }
  }

  static async addUser(data) {
    try {
      const user = new User(data);
      return await user.save();
    } catch (error) {
      throw error;
    }
  }

  static async update(id, data) {
    try {
      const user = await User.findById({ _id: id });
      user.set(data);
      return  await user.save();
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      return await User.deleteOne(id);
    } catch (error) {
      throw error;
    }
  }
}

export default  UserService;