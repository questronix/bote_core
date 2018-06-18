const express = require('express');
const router = express.Router();

const br = require('./model/Branch');

router.get('/', (req, res)=>{
    br.getByNearestLatLong(req.body.latitude, req.body.longitude).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});

module.exports = router;