const express = require('express');
const router = express.Router();

const atm = require('./model/ATM');

router.get('/', (req, res)=>{
    atm.getByNearestLatLong(req.body.latitude, req.body.longitude).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

module.exports = router;