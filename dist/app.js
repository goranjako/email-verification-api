"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _compression = _interopRequireDefault(require("compression"));
var _express = _interopRequireDefault(require("express"));
var _helmet = _interopRequireDefault(require("helmet"));
var _xssClean = _interopRequireDefault(require("xss-clean"));
var _cors = _interopRequireDefault(require("cors"));
var _hpp = _interopRequireDefault(require("hpp"));
var _path = _interopRequireDefault(require("path"));
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
var _morgan = _interopRequireDefault(require("morgan"));
var _expressMongoSanitize = _interopRequireDefault(require("express-mongo-sanitize"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _errorHandler = require("./util/errorHandler");
var _index = _interopRequireDefault(require("./routes/index"));
var _db = require("./config/db");
const app = (0, _express.default)();
_dotenv.default.config();
(0, _db.connectDB)();
// enable cors
const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"]
};
app.use((0, _cors.default)(corsOption));
// view engine setup
app.set("views", _path.default.join(__dirname, "views"));
app.set("view engine", "jade");
app.use((0, _morgan.default)("dev"));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.static(_path.default.join(__dirname, "public")));
app.use((0, _helmet.default)()); // Set security headers
app.use((0, _xssClean.default)()); // Prevent xss attacks
app.use((0, _hpp.default)()); // Prevent http param polution
app.use((0, _compression.default)());
app.use((0, _expressMongoSanitize.default)()); // Sanitize request
// Rate limiting
const limiter = (0, _expressRateLimit.default)({
  windowMs: 10 * 60 * 1000,
  // 10 minuates
  max: 100 // 100 requests
});

app.use(limiter);
// routes setup
app.use("/api", _index.default);
// Catch all route
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Not a valid route"
  });
});
// error handler
app.use(_errorHandler.notFound);
app.use(_errorHandler.errorHandler);
var _default = app;
exports.default = _default;