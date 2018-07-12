const TAG = '[Cart]';
const express = require('express');
const router = express.Router();

const mw = require('../Common/middleware/Authentication');
const err = require('../Common/services/Errors');
const logger = require('../Common/services/Logger');

const cart = require('./model/Cart');

router.get('/', mw.isAuthenticated, (req, res) => {
    const ACTION = '[getCartItems]';
    logger.log('info', TAG + ACTION, '');
    
    cart.viewCartItems(req.user.id)
    .then(data=>{
        res.success(data);
    })
    .catch(error=>{
        res.error(error);
    });
});

router.post('/', mw.isAuthenticated, (req, res) => {
    const ACTION = '[postAddToCart]';
    logger.log('debug', TAG + ACTION, + ' body', req.body);
    
    cart.addItem(req.user.id, req.body.store_item_id, req.body.qty)
    .then(data=>{
        res.success(data);
    })
    .catch(error=>{
        res.error(error);
    });
});

router.get('/items/:item_id', mw.isAuthenticated, (req, res) => {
    const ACTION = '[getItemFromCart]';
    logger.log('debug', TAG + ACTION + ' request parameters ', req.params);
    
    cart.getItemFromCart(req.user.id, req.params.item_id)
    .then(data=>{
        res.success(data);
    })
    .catch(error=>{
        res.error(error);
    });
});

router.put('/items/:item_id', mw.isAuthenticated, (req, res) => {
    const ACTION = '[putUpdateItemInCart]';
    logger.log('debug', TAG + ACTION + ' request parameters ', req.params);
    
    cart.updateItemInCart(req.user.id, req.params.item_id, req.body)
    .then(data=>{
        res.success(data);
    })
    .catch(error=>{
        res.error(error);
    });
});

module.exports = router;