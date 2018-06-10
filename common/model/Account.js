const db = require('../services/Database');
const pass = require('../services/Password');

module.exports.create = (user)=>{
  let encrypt = pass.hash(user.userpass);
  user.userpass = (new Buffer(`${encrypt.passwordHash}:${encrypt.salt}`)).toString("base64");
  return new Promise((resolve, reject)=>{
    db.execute(`INSERT INTO ?? SET ?`, ['account', user]).then(data=>{
      if(data.affectedRows > 0){
        resolve({
          id: data.insertId,
          msg: 'Successfully Registered'
        });
      }else{
        reject({
          msg: data.message
        });
      }
    }).catch(error=>{
      reject(error);
    });
  });
}

module.exports.authenticate = (username, password)=>{
  return new Promise((resolve, reject)=>{
    db.execute(`SELECT userpass FROM ?? WHERE username=?`, ['account', username]).then(data=>{
      if(data.length > 0){
        let base64 = (new Buffer(data[0].userpass, "base64").toString("utf8")).split(":");  
        let isValidPass = pass.validate(password, base64[0], base64[1]);
        if(isValidPass){
          resolve({
            msg: 'Valid Password.'
          });
        }else{
          reject({
            msg: 'Incorrect Password.'
          });
        }
      }else{
        reject({
          msg: 'User is not registered.'
        });
      }
    }).catch(error=>{
      reject(error);
    });
  });
};