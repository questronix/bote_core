const TAG = '[Login]';
const db = require('../../common/services/Database');
const pass = require('../../common/services/Password');
const err = require('../../common/services/Errors');
const logger = require('../../common/services/Logger');

module.exports.authenticate = (username, password)=>{
  const ACTION = '[authenticate]';

  return new Promise((resolve, reject)=>{
    //Find user name first
    db.execute(`SELECT * FROM account WHERE username = ?`, [username])
    .then(data=>{
      //if username found in db
      if(data.length > 0){
        let user = data[0];
        //validate its password
        //Base64('passwordhash:salt')
        let userpass = (Buffer.from(user.userpass, "base64").toString("utf8")).split(":");
        if(pass.validate(password, userpass[0], userpass[1])){
          //return the user
          resolve({
            status: 1,
            msg: 'Success',
            user: {
              id: user.id,
              email: user.email,
              username: user.username,
              fn: user.fn,
              ln: user.ln,
              address: user.address,
              status: user.status,
              date_created: user.date_created
            }
          });
        }else{
          reject(err.raise('INVALID_CREDENTIALS'));
        }
      }else{
        //show error
        reject(err.raise('INVALID_CREDENTIALS'));
      }
    })
    .catch(error=>{
      logger.log('error', TAG + ACTION, error);
      reject(err.raise('INTERNAL_SERVER_ERROR', error));
    });
  });
};