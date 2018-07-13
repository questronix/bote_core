const db = require('../../Common/services/Database');
const err = require('../../Common/services/Errors');
const logger = require('../../Common/services/Logger');
const async = require('async');
const TAG = '[Cart]';

const cart = {
    checker: function(id, sid){
        const ACTION = '[checker]';
        logger.log('info', TAG+ACTION, id, sid)
    
        return new Promise((resolve, reject)=>{
            db.execute(`SELECT * FROM cart WHERE account_id=? AND store_item_id=?`, [id, sid])
            .then(data=>{
                resolve(data);
            })
            .catch(error=>{
                logger.log('error', TAG+ACTION, error);
                reject(err.raise('INTERNAL_SERVER_ERROR', error));
            })
        });
    },

    addToCart: function (id, sid, qty) {
        const ACTION = '[addToCart]';
        return new Promise((resolve, reject)=>{
            db.execute(`INSERT INTO cart(account_id, store_item_id, qty) VALUES (?, ?, ?)`, [id, sid, qty])
            .then(data=>{
                resolve(data);
            })
            .catch(error=>{
                logger.log('error', TAG+ACTION, error);
                reject(err.raise('INTERNAL_SERVER_ERROR', error));
            })
        });
    },

    updateItemInCart: function(account_id, sid, data) {
        const ACTION = '[updateItemFromCart]';
        return new Promise((resolve, reject)=>{
            db.execute(`UPDATE cart SET ? WHERE account_id = ? AND store_item_id = ?`, [data, account_id, sid])
            .then(data=>{
                resolve(data);
            })
            .catch(error=>{
                logger.log('error', TAG+ACTION, error);
                reject(err.raise('INTERNAL_SERVER_ERROR', error));
            })
        });
    },

    viewCartItems: function(id){
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
    },

    getItemFromCart: function(account_id, sid){
        const ACTION = '[getItemFromCart]';
        return new Promise((resolve, reject)=>{
            db.execute(`SELECT store_item_id, qty FROM cart WHERE account_id = ? AND store_item_id = ?`, [account_id, sid])
            .then(data=>{
                resolve(data);
            })
            .catch(error=>{
                logger.log('error', TAG+ACTION, error);
                reject(err.raise('INTERNAL_SERVER_ERROR', error));
            })
        });
    },

    addItem: function(id, sid, qty){
        const ACTION = '[addItem]';
        logger.log('info', TAG+ACTION, id, sid, qty);

        return new Promise((resolve, reject)=>{
            async.auto({
                checker1: function(callback){
                    cart.checker(id, sid)
                    .then(data=>{
                        callback(null, data);
                    })
                    .catch(error=>{
                        logger.log('error', TAG + ACTION, error);
                        callback(error);
                    })
                },
                checker2: ['checker1', function(result, callback){
                    let rows = result.checker1;
                    if(rows.length === 0){
                        cart.addToCart(id, sid, qty)
                        .then(data=>{
                            callback(null, data);
                        })
                        .catch(error=>{
                            logger.log('error', TAG + ACTION, error);
                            callback(error);
                        })
                    }else{
                        let data = {
                            date_removed: null,
                            date_checkout: null,
                            qty: qty
                        }
                        cart.updateItemInCart(id, sid, data)
                        .then(data=>{
                            callback(null, data)
                        })
                        .catch(error=>{
                            logger.log('error', TAG + ACTION, error);
                            callback(error);
                        })
                    }
                }]
            }, function(err, result){
                if(err) reject(err);
                resolve(result.checker2);
            });
        });
    }
};

exports.removeItem = (account_id, sid)=>{
    const ACTION = '[removeItemFromCart]';

    return new Promise((resolve, reject)=>{
        db.execute(`UPDATE cart SET qty=0,date_removed=CURDATE()
            WHERE account_id= ? AND store_item_id= ?
            AND date_removed IS NULL;`,
        [account_id, sid])
        .then(data=>{
            resolve({msg: "successfully removed item"});
        })
        .catch(error=>{
            logger.log('error', TAG+ACTION, error);
            reject(err.raise('INTERNAL_SERVER_ERROR'));
        })
    })
}

module.exports = {...cart};
