const db = require('../../Common/services/Database');
const err = require('../../Common/services/Errors');
const logger = require('../../Common/services/Logger');
const TAG = '[Users]';

// returns
// {
//   id: id,
//   username: username,
//   fn: fn,
//   ln: ln,
//   email: email,
//   following: no_of_following,
//   followers: no_of_followers
// }

// get user profile by username
exports.getProfile = (username)=>{
  const ACTION = '[visitProfile]';
  return new Promise((resolve, reject)=>{
    db.execute(
      `SELECT x.id, x.username, x.fn, x.ln, x.email, y.following, z.followers
       FROM(select * from account where username=? and status=1) x,
           (select account_id, count(*) "following" from friends where account_id=(select id from account where username=? and status=1)) y,
           (select friend_id, count(*) "followers" from friends where friend_id=(select id from account where username=? and status=1)) z;`,
    [username, username, username])
    .then(data=>{
      if(data.length > 0){
        resolve({
          status: 200,
          user: data[0]
        });
      }else{
        logger.log('error', TAG+ACTION);
        reject(err.raise('NOT_FOUND'))
      }
    }).catch(error=>{
      logger.log('error', TAG+ACTION, error);
      reject(err.raise('INTERNAL_SERVER_ERROR'));
    });
  })
}

exports.editUserProfile = (data, id) => {
  const ACTION = '[editProfile]';
  return new Promise((resolve, reject)=>{
    db.execute(`UPDATE account SET ? WHERE id = ?;`, [data, id])
    .then(data=>{
      resolve({
        status: 200,
        msg: 'Successfully edited profile'
      });
    })
    .catch(error=>{
      logger.log('error', TAG+ACTION, error);
      reject(err.raise('INTERNAL_SERVER_ERROR'));
    });
  });
}