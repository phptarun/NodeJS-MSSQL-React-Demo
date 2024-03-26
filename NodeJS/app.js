var createError = require("http-errors");
const express = require("express");
const fileUpload = require("express-fileupload");
var bodyParser = require("body-parser");
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
var cors = require("cors");

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const dotenv = require("dotenv");
//if (process.env.NODE_ENV == "local") {
dotenv.config();
// }
console.log("NODE_ENV -> " + process.env.NODE_ENV);

const auth = require("./middleware/auth");
const security = require("./middleware/security/index");

const indexRouter = require("./routes/index");
const healthRouter = require("./routes/health");
const userLogin = require("./routes/login");
const userRoutes = require("./routes/user");

var app = express();
app.disable("etag");
app.use(fileUpload());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const options = {
  definition: require("./swagger.json"),
  apis: ["./routes/*.js"],
};

var api_root = "/api/v1";

app.use("/", indexRouter);
app.use(api_root + "/health", security, healthRouter);
app.use(api_root + "/login", security, userLogin);
app.use(api_root + "/user", security, auth, userRoutes);

const specs = swaggerJsdoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
