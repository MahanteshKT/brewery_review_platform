const express = require("express");
const router = express.Router();
const {
  signupController,
  loginController,
  OTPController,
} = require("./../controllers/AuthController");
router.post("/signup", signupController);
router.post("/otp", OTPController);
router.post("/login", loginController);

module.exports = router;
