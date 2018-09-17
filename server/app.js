//-- Require
const configauth = require('./config.json');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const tvshowsJson = require('./tvshows.json');
const config = require('./config.js');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');
const path = require('path');
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect(
  'mongodb://localhost/PiggyBack', {
     useMongoClient: true,
      promiseLibrary: require('bluebird')
     })
  .then(() =>  console.log('mongoose connected'))
  .catch((err) => console.error(err));

//-- JWT check
// Update with your Auth0 information into /server/config.js

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.CLIENT_DOMAIN}/.well-known/jwks.json`
    }),
    audience: config.AUTH0_AUDIENCE,
    issuer: `https://${config.CLIENT_DOMAIN}/`,
    algorithm: 'RS256'
});

//--- Set up app
app.use(morgan('dev'));
app.use('/uploads', express.static(process.cwd() + '/uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
const jwtgah = jwt({
  secret: configauth.secret,
  getToken: function (req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
          return req.query.token;
      }
      return null;
  }
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

//start routes
//default routes to handle api requests

//--- GET protected tvshows route
app.get('/api/tvshows', jwtCheck, function (req, res) {
  res.json(tvshowsJson);
});
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error('Route Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
      error: {
          message: error.message
      }
  });
});

// error handler
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid Token');
    } else {
        throw err;
    }
});

//--- Port
app.listen(3001);
console.log('Listening on localhost:3001');
