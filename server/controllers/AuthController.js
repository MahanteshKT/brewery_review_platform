const UserSchema = require("./../models/UserModel");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

const createToken = (_id) => {
  return jwt.sign({ _id }, "process.env.SECRET", { expiresIn: "3d" });
};

const generateOTP = () => {
  return otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
};

const sendMail = (email, subject, message, site) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "karine87@ethereal.email",
      pass: "PQ7byQsdaNDETUgUMG",
    },
  });

  async function main() {
    const info = await transporter.sendMail({
      from: '"mahantesh kt" <mkt@example.com>', // sender address
      to: `${email}`, // list of receivers
      subject: subject, // Subject line
      text: message, // plain text body
      html: `<b>go to site to verify?<a href=${site} >Click here</a></b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
  }
  main().catch(console.error);
};

const OTPController = async function (req, res) {
  const { email, password, fullName, department, role } = req.body;

  if (!email) {
    res.status(400).json({ error: "all Fields must be filled " });
  }
  const exists = await UserSchema.findOne({ email });
  if (exists) {
    res.status(400).json({ error: "email already exists." });
  }

  const otp = generateOTP();
  try {
    sendMail(
      email,
      "Email for OTP Varification code",
      `your otp verification code is ${otp}.`,
      `http://127.0.0.1:5273/otp`
    );
    return res
      .status(200)
      .json({ otp: otp, msg: "succssfully sent otp to email" });
  } catch (err) {
    return res.status(400).json({ error: `unable to send the otp--${err}` });
  }
};

const signupController = async function (req, res) {
  const data = req.body;
  console.log("ygyg", req.body);
  try {
    const user = await UserSchema.signup(data);
    res.status(200).json({ ...data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginController = async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await UserSchema.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupController,
  loginController,
  OTPController,
};
