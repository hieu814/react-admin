require('dotenv').config()
var express = require('express');
var log = require('morgan')('dev');
var bodyParser = require('body-parser');
var cors = require('cors')

var properties = require('./config/properties');
var db = require('./config/database');
const routes = require('./routes/index')
var passport = require('passport');
var errorHandle = require('./middleware/errorHandle')
var session = require('express-session')
require('./passport/pass')
var app = express();
app.use(cors());
var whitelist = properties.CORS;
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// app.use(cors(corsOptions));

var router = express.Router();

db();

app.use(log);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: "secret",
  saveUninitialized: true,
  resave: true
}))
router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

app.use(passport.initialize());
app.use(passport.session());

routes(app);
app.use(errorHandle);
app.listen(properties.PORT, (req, res) => {
  console.log(`Server is running on ${properties.PORT} port.`);
})
