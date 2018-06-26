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
    br.getStoreHours(req.query.opening, req.query.closing).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});


router.post('/', (req, res)=>{
    br.getNearestBranch(req.body.input).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.json(error);
    });
});



module.exports = router;