var bcrypt = require("bcrypt");
var UserModel = require("../model/users.model");
const authenticationMiddleware = require("../middleware/authentication.middleware");

const AuthController = {
  loginUser: async (req, res) => {
    var { email, password } = req.body;
    var ifUserFounded = await UserModel.findOne({ email: email });
    if (!ifUserFounded) {
      return res.send("User not found");
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
      return res.send("User registered successfully");
    } else {
      return res.send("Error! Something went wrong user is not registered");
    }
  },
};

module.exports = AuthController;
