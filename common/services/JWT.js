const jwt = require('jsonwebtoken');
const logger = require('../services/Logger');

let TAG = 'JWT';
const JWT = function(payload){
  this.payload = payload;
  this.secret = process.env.JWT_SECRET;
  this.options = {
    expiresIn: '24h'
  };
}

JWT.prototype.sign = function(){
  let ACTION = '[sign]';
  logger.log('info', `${TAG}${ACTION}`, this.payload);
  return jwt.sign(this.payload, this.secret, this.options);
};

JWT.prototype.verify = function(payload, callback){
  let ACTION = '[verify]';
  logger.log('info', `${TAG}${ACTION}`, payload);
  jwt.verify(payload, this.secret, (err, code)=>{
    logger.log('info', `${TAG}${ACTION} result`, code);
    callback(err, code);
  });
};

JWT.prototype.decode = function(token){
  return jwt.decode(token, this.options);
};

module.exports = JWT;