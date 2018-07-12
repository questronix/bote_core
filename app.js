const express = require('express');
const session = require('express-session');

const path = require('path');

//middleware to process POST data
const bodyParser = require('body-parser');

//service for logging
const logger = require('./Modules/Common/services/Logger');

const app = express();

// implement standard security from helmet
const helmet = require('helmet');
app.use(helmet());

//set the template engine into ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// setup success/error handler
app.use(function(req, res, next) {
  res.success = function(body) {
    logger.log('debug', res.req.method + ' ' + req.originalUrl + ' response', body);
    res.status(200);
    res.json(body);
  };

  res.error = function(error) {
    logger.log('error', res.req.method + ' ' + req.originalUrl + ' response', error);
    res.status(error.status);
    res.json(error.error);
  };

  next();
});

// serve the files out of ./public as our main files
app.use(express.static(path.join(__dirname, 'public')));


const db = require('./Modules/Common/services/Database');
let mysqlConnect = db.connect();
mysqlConnect.then((connect)=>{
  logger.log('info', '[MySQLDB]', `Connected to ${process.env.CORE_DB_HOST}:${process.env.CORE_DB_PORT}`);
}).catch((error) => {
  logger.log('error', '[MySQLDB]', `Connection to ${error.address}:${error.port} failed - connect ${error.code} ${error.address}:${error.port}`);
});

if(process.env.SKIP_REDIS === 'true'){
  //declare session middleware
  app.use(session({
    secret: 'session.secret.key',
    saveUninitialized: false,
    resave: false
  }));
}else{
  const redis = require('redis');
  const redisStore = require('connect-redis')(session);
  const client = redis.createClient();

  client.on('connect', ()=>{
    logger.log('info', '[Redis]', `Connected to ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
  });
  client.on('error', (error)=>{
    logger.log('error', '[Redis]', `Connection to ${error.address}:${error.port} failed - connect ${error.code} ${error.address}:${error.port}`);
  });

  //declare session middleware using redis
  app.use(session({
    secret: 'session.secret.key',
    // create new redis store.
    store: new redisStore({
        client: client,
        host: process.env.REDIS_HOST || 'localhost', //redis host
        port: process.env.REDIS_PORT || '6379', //redis port
        ttl: process.env.REDIS_TTL || '3600' //redis ttl (time to live)
    }), 
    saveUninitialized: false,
    resave: false
  }));
}

//for CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  next();
});

const login   = require('./Modules/Login');
const users   = require('./Modules/Users');
const bars    = require('./Modules/Bars');
const cart    = require('./Modules/Cart');
const logout  = require('./Modules/Logout');
/**
 * BOTE ROUTES
 */
app.use('/login', login);
app.use('/users', users);
app.use('/bars', bars);
app.use('/cart', cart);
app.use('/logout', logout);

module.exports = app;