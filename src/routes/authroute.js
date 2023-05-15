import express from "express";
const {
  validateRegistrationBody,
  validateLoginBody,
  validateContactBody,
  validate,
} = require("../util/validation");
import authController from "../controllers/auth.controller";
const router = express.Router();

router.post(
  "/register",
  validateRegistrationBody(),
  validate,
  authController.register
);
router.post("/login", validateLoginBody(), validate, authController.login);
router.route("/verify").post(authController.verify);

export default router;
