const db = require('../../Common/services/Database');
const err = require('../../Common/services/Errors');
const logger = require('../../Common/services/Logger');
const TAG = '[Users]';

// returns
// {
//     count: no_of_followers,
//     following: [user_object, ...]
// }

exports.getFollowing = (username) => {
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
      resolve({
        count: data.length,
        following: data
      });
    })
    .catch(error=>{
      logger.log('error', TAG+ACTION, error);
      reject(err.raise('INTERNAL_SERVER_ERROR'));
    });
  })
}