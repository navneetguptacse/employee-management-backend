var express = require("express");
var router = express.Router();
const authenticationController = require("../controller/authentication.controller");

/* GET users listing. */
router.post("/login", authenticationController.loginUser);
router.post("/register", authenticationController.registerUser);

module.exports = router;
