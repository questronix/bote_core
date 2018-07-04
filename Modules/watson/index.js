const express = require('express');
const router = express.Router();

const watson = require('./services/WatsonConversation');
const gc = require('../Common/services/Geocode');
const sh = require('../Common/services/StoreHours');
const actions = require('./services/WatsonActions');

router.post('/', (req, res, next)=>{
  watson.sendMessage(req.body.context, req.body.input).then(data=>{
    res.json(data);
  }).catch(error=>{
    res.status(400).json(error);
  });
});


module.exports = router;