const db = require('../../common/services/Database');
const err = require('../../common/services/Errors');
const logger = require('../../common/services/Logger');
const TAG = '[Profile]';

// returns
// {
//     count: no_of_followers,
//     followers: [user_object, ...]
// }

module.exports.getFollowers = (username) => {
  const ACTION = '[getFollowers]';

  return new Promise((resolve, reject) => {
    db.execute(`SELECT id, fn, ln, username FROM account
      WHERE id in (
        SELECT account_id FROM friends
        WHERE friend_id=(
          SELECT id FROM account WHERE username=?
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
        resolve({
          count: 0,
          msg: 'no followers'
        });
      }
    })
    .catch(error=>{
      logger.log('error', TAG+ACTION, error);
      reject(err.raise('INTERNAL_SERVER_ERROR', error));
    });
  })
}