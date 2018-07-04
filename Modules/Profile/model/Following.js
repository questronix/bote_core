const db = require('../../common/services/Database');
const err = require('../../common/services/Errors');
const logger = require('../../common/services/Logger');
const TAG = '[Profile]';

// returns
// {
//     count: no_of_followers,
//     following: [user_object, ...]
// }

module.exports.getFollowing = (username) => {
  const ACTION = '[getFollowing]';
  return new Promise( (resolve, reject) => {
    db.execute(`SELECT id, fn, ln, username FROM account
      WHERE id in (
        SELECT friend_id FROM friends
        WHERE account_id=(
        SELECT id FROM account WHERE username=? and status=1
        )
      )`,
    [username])
    .then(data => {
      if (data.length > 0 ){
        resolve({
          count: data.length,
          following: data
        });
      }else{
        reject({
          count: 0,
          msg: 'follows no one'
        });
      }
    })
    .catch(error=>{
      logger.log('error', TAG+ACTION, error);
      reject(err.raise('INTERNAL_SERVER_ERROR',error));
    });
  })
}