var bcrypt = require("bcrypt");
var UserModel = require("../model/users.model");
const authenticationMiddleware = require("../middleware/authentication.middleware");

const {
  sendEmail,
  decodeEmailToken,
} = require("../utils/emailVerification.utils");
const AuthenticationMiddleware = require("../middleware/authentication.middleware");

const AuthController = {
  loginUser: async (req, res) => {
    var { email, password } = req.body;
    var ifUserFounded = await UserModel.findOne({ email: email });
    if (!ifUserFounded) {
      return res.send("User not found");
    }

    if (!ifUserFounded.isEmailVerified) {
      return res.send("Email not verified");
    }

    let isPasswordMatched = await bcrypt.compare(
      password,
      ifUserFounded.password
    );
    if (!isPasswordMatched) {
      return res.send("Password mis-match");
    } else {
      const TOKEN = authenticationMiddleware.generateToken(ifUserFounded);
      return res.send({
        status: "success",
        data: ifUserFounded,
        TOKEN,
      });
    }
  },
  registerUser: async (req, res) => {
    var { employeeName, email, phoneNumber, dob, username, password } =
      req.body;

    let ifUserFounded = await UserModel.findOne({ email: email });
    if (ifUserFounded) {
      return res.send("User already exist!");
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    let user = new UserModel({
      employeeName: employeeName,
      email: email,
      username: username,
      password: hashedPassword,
      dob: dob,
      phoneNumber: phoneNumber,
    });

    let dataSaved = await user.save();

    if (dataSaved) {
      const token = authenticationMiddleware.generateToken({ email: email });
      const isMailSent = await sendEmail(email, token);
      if(!isMailSent){
        return res.send("Error! Something went wrong email is not sent");
      }
      return res.send("User registered successfully, please verify your email");
    } else {
      return res.send("Error! Something went wrong user is not registered");
    }
  },
  verifyEmail: async (req, res) => {
    const { token } = req.params;
    const decodedToken = await AuthenticationMiddleware.verifyEmailToken(token);
    if (decodedToken) {
      let ifUserFounded = await UserModel.findOne({
        email: decodedToken.email,
      });
      if (ifUserFounded) {
        ifUserFounded.isEmailVerified = true;
        let isUserSaved = await ifUserFounded.save();
        if (isUserSaved) {
          return res.send("Email verified successfully");
        } else {
          return res.send("Error! Something went wrong email is not verified");
        }
      } else {
        return res.send("User not found");
      }
    } else {
      return res.send("Invalid token");
    }
  },
};

module.exports = AuthController;
