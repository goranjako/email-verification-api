import UserService from "../services/user.service";
import nodemailer from "nodemailer";
class userController {
  // Get all
  async getAll(req, res) {
    try {
      const docs = await UserService.getAll();
      return res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
  // Insert
  async create(req, res, next) {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports 465 587
        auth: {
          user: "fullstackweb03@gmail.com",
            pass: "ybdzbwaxbesdiqsw" // generated ethereal password
        },
      });

      let info = await transporter.sendMail({
        from: 'fullstackweb03@gmail.com', // sender address
        to: "goranjako@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    
    

      return res
        .status(200)
        .json({ success: true, message: " User is Created successfully." });
    } catch (err) {
      res.status(422).json(err.message);
    }
  }

  // Get by id
  async get(req, res) {
    try {
      const obj = await UserService.getById({ _id: req.params.id });
      if (obj) {
        return res.status(200).json(obj);
      } else {
        return res.status(400).json({ error: "User not found" });
      }
    } catch (err) {
      return res.status(400).json({ error: "User not found" });
    }
  }

  // Update by id
  async put(req, res) {
    const data = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    };
    const id = req.params.id;

    try {
      const contact = await UserService.update(id, data);
      return res
        .status(200)
        .json({ success: true, message: " User is Updated successfully." });
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist!" });
    }
  }
  // Delete by id
  async delete(req, res) {
    try {
      await UserService.delete({ _id: req.params.id });
      return res.json({
        success: true,
        message: " User is Deleted successfully.",
      });
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist!" });
    }
  }
}

export default new userController();