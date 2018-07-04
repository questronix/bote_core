const TAG = '[Login]';
const express = require('express');
const router = express.Router();

const lm = require('./model/Login');
const logger = require('../Common/services/Logger');

router.post('/', (req, res, next)=>{
  var ACTION = '[postLogin]';
  logger.log('debug', TAG + ACTION + ' request body', req.body)
  lm.authenticate(req.body.username, req.body.password)
  .then(data=>{
    res.success(data);
  })
  .catch(error=>{
    res.error(error);
  });
});

module.exports = router;