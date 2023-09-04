var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../model/users.model');

/* GET users listing. */
router.post('/login', async(req, res) => {
  var { email, password } = req.body;
  var ifUserFounded = await User.findOne({ email: email });
  if (!ifUserFounded) {
    return res.send("User not found");
  }

  let isPasswordMatched = await bcrypt.compare(password, ifUserFounded.password);
  if(!isPasswordMatched) {
    return res.send("Password mis-match");
  } else {
    return res.send ({
      status: "success",
      data: ifUserFounded
    });
  }
});


router.post('/register', async(req, res) => {
  var { employeeName, email, phoneNumber, dob, username, password } = req.body;
  
  let ifUserFounded = await User.findOne({ email: email });
  if (ifUserFounded) {
    return res.send("User already exist!");
  }

  let hashedPassword = await bcrypt.hash(password,10);

  let user = new User ({
    employeeName: employeeName,
    email: email,
    username: username,
    password: hashedPassword,
    dob: dob,
    phoneNumber: phoneNumber
  });

  let dataSaved = await user.save(); // if data found then update else being undefined

  if(dataSaved) {
    return res.send('User registered successfully');
  } else {
    return res.send('Error! Somthing went wrong user is not registered');
  }
})

module.exports = router;
