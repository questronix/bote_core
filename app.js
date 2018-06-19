const express = require('express');
const session = require('express-session');

const path = require('path');

//middleware to process POST data
const bodyParser = require('body-parser');

//service for logging
const logger = require('./common/services/Logger');

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
  }
  res.error = function(error) {
    logger.log('error', res.req.method + ' ' + req.originalUrl + ' response', error);
    res.status(error.status);
    res.json({ errors: [error.error] });
  }
  next();
});

// serve the files out of ./public as our main files
app.use(express.static(path.join(__dirname, 'public')));


const db = require('./common/services/Database');
let mysqlConnect = db.connect();
mysqlConnect.then((connect)=>{
  console.info('[MySQLDB] Database connected', connect);
}).catch((error) => {
  console.error('[MySQLDB] Database error in connection', error);
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

const login = require('./Login');
const profile = require('./Profile');
const watson = require('./watson');
const logout = require('./Logout');

app.use('/login', login);
app.use('/profile', profile);
app.use('/chat', watson);
app.use('/logout', logout);

module.exports = app;
