require('dotenv').config();

const jwt = require("jsonwebtoken");
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET;

const AuthenticationMiddleware = {
  authenticate: (req, res, next) => {
    try {
      let TOKEN = req.headers.authorization.split(" ")[1];
      let decoded = jwt.verify(TOKEN, ACCESS_TOKEN);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).send("Unauthorized");
    }
  },
  generateToken: (user) => {
    let TOKEN = jwt.sign(
      {
        id: user._id,
        email: user.email,
        employeeName: user.employeeName,
        phoneNumber: user.phoneNumber,
        dob: user.dob,
        userName: user.userName,
      },
      ACCESS_TOKEN,
      { expiresIn: "1h" }
    );
    return TOKEN;
  },
};

module.exports = AuthenticationMiddleware;
