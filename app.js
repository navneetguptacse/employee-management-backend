var express = require("express");
var path = require("path");
var mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var projectRouter = require("./routes/project");
var taskRouter = require("./routes/task");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

var app = express();
mongoose.connect("mongodb://0.0.0.0:27017/employee").then(() => {
  console.log("Database connection established!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/project", projectRouter);
app.use("/task", taskRouter);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
