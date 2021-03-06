const db = require('../../Common/services/Database');
const err = require('../../Common/services/Errors');
const logger = require('../../Common/services/Logger');
const TAG = '[Users]';

/*gets the bar(s) where drinker claimed drinks from*/
exports.getBarsVisited = (username)=> {
    const ACTION = '[getBarsVisited]';
    return new Promise((resolve, reject)=>{
        db.execute(`SELECT DISTINCT x.* from (SELECT name, address FROM store WHERE id IN
            (SELECT store_id FROM stash_trans WHERE to_account_id = 
            (SELECT id FROM account WHERE username = ?) and status = 1)) x`, [username])
        .then(data=>{
            resolve({
                count: data.length,
                data: data
            });
        }).catch(error=>{
            logger.log('error', TAG+ACTION, error);
            reject(err.raise('INTERNAL_SERVER_ERROR', error));
        })
    });
}