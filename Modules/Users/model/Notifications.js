const TAG='[User]'
const db = require('../../Common/services/Database');
const err = require('../../Common/services/Errors');
const logger = require('../../Common/services/Logger');


exports.getNotifications = (id)=>{
  const ACTION = 'getNotifications';

  return new Promise( (resolve, reject) => {
    db.execute(`SELECT * FROM notifs WHERE receiver_id=? order by date_created DESC`,
    [id])
    .then( (data)=>{
      resolve(data);
    }).catch( (error=>{
      logger.log('error', TAG+ACTION, error);
      reject(err.raise('INTERNAL_SERVER_ERROR', error));
      })
    );
  })
}