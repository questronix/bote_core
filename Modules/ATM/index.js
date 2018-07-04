const express = require('express');
const router = express.Router();

const atm = require('./model/ATM');
const gc = require('../Common/services/Geocode');

router.get('/', (req, res)=>{
    atm.getByNearestLatLong(req.query.latitude, req.query.longitude).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

router.get('/', (req, res)=>{
    atm.getNearestATM(gc.geocoordinate(req.query.input).latitude, gc.geocoordinate(req.query.input).longtitude).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});


module.exports = router;