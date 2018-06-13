const db = require('../../common/services/Database');

module.exports.getUserProfile = (id)=>{
  return new Promise((resolve, reject)=>{
    db.execute(`SELECT * FROM account WHERE id = ?`, [id])
    .then(data=>{
      if(data.length > 0){
        //dont show password
        delete data[0].userpass;
        resolve({
          status: 1,
          user: data[0]
        });
      }else{
        reject({
          status: 0,
          msg: 'User not found'
        })
      }
    }).catch(error=>{
      reject({
        status: 0,
        msg: 'Error',
        error: error
      });
    });
  })
};