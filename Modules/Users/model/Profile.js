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

exports.getProfile = (username)=> {
  const ACTION = '[getProfile]';
  return new Promise((resolve, reject)=>{
    db.execute(
      `SELECT x.id, x.username, x.fn, x.ln, x.email, y.following, z.followers, a.bottles, b.bars
       FROM(SELECT * FROM account WHERE id=(select id from account where username=? and status=1) and status=1) x,
           (SELECT account_id, count(*) "following" FROM friends WHERE account_id=(select id from account where username=? and status=1)) y,
           (SELECT friend_id, count(*) "followers" FROM friends WHERE friend_id=(select id from account where username=? and status=1)) z,
           (SELECT count(*) "bottles" FROM stash_details WHERE stash_id IN
            (SELECT id FROM stash WHERE to_account_id = (select id from account where username=? and status=1))) a,
           (SELECT count(*) "bars" from (SELECT * FROM store WHERE id IN
            (SELECT store_id FROM stash_trans WHERE to_account_id = (select id from account where username=? and status=1) and status = 1))c) b;`,
      [username, username, username, username, username])
    .then(data=>{
      if(data.length > 0){
        resolve({
          status: 1,
          user: data[0]
        });
      }else{
        logger.log('error', TAG+ACTION, error);
        reject({
          status: 404,
          error: {
            code: -4,
            message: 'Page not Found'
          }
        })
      }
    }).catch(error=>{
      logger.log('error', TAG+ACTION, error);
      reject(err.raise('INTERNAL_SERVER_ERROR', error));
    });
  })
}

exports.editUserProfile = (data, id) => {
  const ACTION = '[editProfile]';
  return new Promise((resolve, reject)=>{
    db.execute(`UPDATE account SET ? WHERE id = ?;`, [data, id])
    .then(data=>{
      resolve({
        msg: 'Successfully edited profile'
      });
    })
    .catch(error=>{
      logger.log('error', TAG+ACTION, error);
      reject(err.raise('INTERNAL_SERVER_ERROR', error));
    });
  });
}