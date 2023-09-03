var express = require('express');
const { get } = require('mongoose');
var router = express.Router();
var User = require('../model/users');

/* GET users listing. */
router.post('/login', async(req, res) => {
  // var req = {
  //   body: {
  //     email: 'abc@email.com',
  //     password : 'abc@123'
  //   }
  // }

  // var email = req.body.email;
  var { email, password } = req.body;
  let ifUserFounded = await User.find({email:email});
});


module.exports = router;
