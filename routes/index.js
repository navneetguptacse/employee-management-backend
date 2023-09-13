var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  // res.render('index', { title: 'Express' });
  return res.send({
    name: "employee-mgnt-backend",
    version: "0.0.0",
    private: true,
  });
});

module.exports = router;
