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
      `SELECT 
      a.id,
      a.username,
      a.fn,
      a.ln,
      a.email,
      a.address,
      a.date_created,
      a.date_activated,
      (SELECT count(account_id) FROM friends WHERE account_id = a.id) as following,
      (SELECT count(friend_id) FROM friends WHERE friend_id = a.id) as followers,
      (SELECT COUNT(id) FROM stash_details WHERE stash_id IN (SELECT id FROM stash WHERE to_account_id = a.id) ) as bottles,
      (SELECT COUNT(id) FROM store WHERE id IN (SELECT store_id FROM stash_trans WHERE to_account_id = a.id)) as bars
    FROM account a
    WHERE a.username = ? and status = 1`,
      [username])
    .then(data=>{
      if(data.length > 0){
        resolve({
          status: 200,
          user: data[0]
        });
      }else{
        logger.log('error', TAG+ACTION, error);
        reject(err.raise('NOT_FOUND'))
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