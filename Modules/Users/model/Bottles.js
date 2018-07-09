const db = require('../../Common/services/Database');
const err = require('../../Common/services/Errors');
const logger = require('../../Common/services/Logger');
const TAG = '[Users]';

exports.getInventory = (id)=> {
    const ACTION = '[getInventory]';
    return new Promise((resolve, reject)=>{
        db.execute(`SELECT i.brand_name, i.short_name, i.shots "total shots", sd.qty "remaining" FROM item i
        LEFT JOIN store_items si on i.id=si.item_id
        LEFT JOIN stash_details sd on si.id=sd.store_item_id
        WHERE stash_id IN (SELECT id FROM stash WHERE to_account_id=?) ORDER BY i.id`, [id])
        .then(data=>{
            resolve({
                data: data
            });
        }).catch(error=>{
            logger.log('error', TAG+ACTION, error);
            reject(err.raise('INTERNAL_SERVER_ERROR', error));
        })
    });
}