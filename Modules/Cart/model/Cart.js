const db = require('../../Common/services/Database');
const err = require('../../Common/services/Errors');
const logger = require('../../Common/services/Logger');
const TAG = '[Cart]';

exports.viewCartItems = (id) => {
    const ACTION = '[viewCartItems]';
    return new Promise((resolve, reject)=>{
        db.execute(`SELECT si.id "store_item_id", i.brand_name, i.short_name, i.details, i.tags, i.type, i.shots,
        c.qty, si.amount, si.qty "stocks" FROM item i
        LEFT JOIN store_items si ON i.id=si.item_id
        LEFT JOIN cart c ON si.id=c.store_item_id 
        WHERE c.date_removed IS NULL AND c.account_id=?`, [id])
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

exports.addToCart = (id, sid, qty) => {
    const ACTION = '[addToCart]';
    return new Promise((resolve, reject)=>{
        db.execute(`INSERT INTO cart(account_id, store_item_id, qty) VALUES (?, ?, ?)`, [id, sid, qty])
        .then(data=>{
            resolve({
                msg: "Successfully added item to cart"
            });
        })
        .catch(error=>{
            logger.log('error', TAG+ACTION, error);
            reject(err.raise('INTERNAL_SERVER_ERROR', error));
        })
    });
}

exports.getItemFromCart = (account_id, sid) => {
    const ACTION = '[getItemFromCart]';
    return new Promise((resolve, reject)=>{
        db.execute(`SELECT store_item_id, qty FROM cart WHERE account_id = ? AND store_item_id = ?`, [account_id, sid])
        .then(data=>{
            resolve({
                data: data[0]
            });
        })
        .catch(error=>{
            logger.log('error', TAG+ACTION, error);
            reject(err.raise('INTERNAL_SERVER_ERROR', error));
        })
    });
}

exports.updateItemInCart = (account_id, sid, data) => {
    const ACTION = '[updateItemFromCart]';
    return new Promise((resolve, reject)=>{
        db.execute(`UPDATE cart SET ? WHERE account_id = ? AND store_item_id = ?`, [data, account_id, sid])
        .then(data=>{
            resolve({
                msg: "Successfully updated item"
            });
        })
        .catch(error=>{
            logger.log('error', TAG+ACTION, error);
            reject(err.raise('INTERNAL_SERVER_ERROR', error));
        })
    });
}