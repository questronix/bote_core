const express = require('express');
const router = express.Router();

const watson = require('./services/WatsonConversation');
const gc = require('../common/services/Geocode');
const sh = require('../common/services/StoreHours');

router.post('/', (req, res, next)=>{
  watson.sendMessage(req.body.context, req.body.input).then(data=>{
    res.json(data);
  }).catch(error=>{
    res.status(400).json(error);
  });
});


// router.get('/', (req, res)=>{
  
//   gc.geocoordinate(req.query.input).then(data=>{
//       res.status(200).json(JSON.parse(data.body));
//   }).catch(error=>{
//       res.json(error);
//   });
// });


router.get('/', (req, res)=>{
  sh.storehours(req.query.name).then(data=>{
      res.json(data);
  }).catch(error=>{
      res.json(error);
  });
});



module.exports = router;