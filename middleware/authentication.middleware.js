const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET =
  "767288a20bae2f20fa9c0478e50ead6ade9cb31c422230bc02f0e02fdaf57787ff6ee07326051047fc81cb69bdd2f5f02272a601da97ac6bf989efa61a05d366";

const AuthenticationMiddleware = {
  authenticate: (req, res, next) => {
    try {
      let TOKEN = req.headers.authorization.split(" ")[1];
      let decoded = jwt.verify(TOKEN, ACCESS_TOKEN_SECRET);
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
      ACCESS_TOKEN_SECRET,
      { expiresIn: "5min" }
    );
    return TOKEN;
  },
};

module.exports = AuthenticationMiddleware;
