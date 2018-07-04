const express = require('express');
const router = express.Router();

const br = require('./model/Branch');
const gc = require('../common/services/Geocode');

// router.get('/', (req, res)=>{
//     br.getByNearestLatLong(req.query.latitude, req.query.longitude).then(data=>{
//         res.json(data);
//     }).catch(error=>{
//         res.json(error);
//     });
// });

router.get('/', (req, res)=>{
    br.getNearestBranch(req.query.input).then(data=>{
        console.log("tama");
        res.json(data);
        console.log(data);
        
    }).catch(error=>{
        console.log("mali");
        res.json(error);
    });
});



module.exports = router;