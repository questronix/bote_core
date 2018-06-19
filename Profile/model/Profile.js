const db = require('../../common/services/Database');
const err = require('../../common/services/Errors');
const logger = require('../../common/services/Logger');
const TAG = '[Profile]';

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


// get user profile by ID
//  should return own profile of user
module.exports.getUserProfile = (id)=>{
  const ACTION = '[getProfile]';
  return new Promise((resolve, reject)=>{
    db.execute(
      `SELECT x.id, x.username, x.fn, x.ln, x.email, y.following, z.followers
       FROM(select * from account where id=?) x,
           (select account_id, count(*) "following" from friends where account_id=?) y,
           (select friend_id, count(*) "followers" from friends where friend_id=?) z;`,
    [id, id, id])
    .then(data=>{
      if(data.length > 0){
        //dont show password
        resolve({
          status: 1,
          user: data[0]
        });
      }else{
        logger.log('error', TAG+ACTION, `user_profile:${id} not found`);
        reject(err.raise('INTERNAL_SERVER_ERROR', ));
        }
    }).catch(error=>{
      logger.log('error', TAG+ACTION, error);
      reject(err.raise('INTERNAL_SERVER_ERROR', error));
    });
  })
};

// get user profile by username
module.exports.getOtherProfile = (username)=>{
  const ACTION = '[visitProfile]';
  return new Promise((resolve, reject)=>{
    db.execute(
      `SELECT x.id, x.username, x.fn, x.ln, x.email, y.following, z.followers
       FROM(select * from account where username=?) x,
           (select account_id, count(*) "following" from friends where account_id=(select id from account where username=?)) y,
           (select friend_id, count(*) "followers" from friends where friend_id=(select id from account where username=?)) z;`,
    [username, username, username])
    .then(data=>{
      if(data.length > 0){
        //dont show password
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
      logger.log('error', TAG+ACTION, error);
      reject(err.raise('INTERNAL_SERVER_ERROR', error));
    });
  })
}