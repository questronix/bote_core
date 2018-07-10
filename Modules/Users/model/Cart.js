const db = require('../../Common/services/Database');
const err = require('../../Common/services/Errors');
const logger = require('../../Common/services/Logger');
const TAG = '[Users]';

exports.viewCartItems = (username) => {
    const ACTION = '[viewCartItems]';
    return new Promise((resolve, reject)=>{
        db.execute(`SELECT i.*, c.qty, si.amount, si.qty "stocks" FROM item i
        LEFT JOIN store_items si ON i.id=si.item_id
        LEFT JOIN cart c ON si.id=c.store_item_id 
        WHERE c.date_removed IS NULL AND c.account_id=(SELECT id FROM account WHERE username=?)`, [username])
        .then(data=>{
            resolve({
                data: data
            });
        })
        .catch(error=>{
            logger.log('error', TAG+ACTION, error);
            reject(err.raise('INTERNAL_SERVER_ERROR', error));
        })
    });
}