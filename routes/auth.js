var express = require('express');
var router = express.Router();
var User = require('../model/users');

/* GET users listing. */
router.post('/login', async(req, res) => {
  var { email, password } = req.body;
  const ifUserFounded = await User.findOne({ email: email });
  if (!ifUserFounded) {
    return res.send("User not found");
  }
 
  if (ifUserFounded.password != password) {
    return res.send("Password is incorrect");
  } else {
    return res.send("Login successfully");
  }
});


module.exports = router;
