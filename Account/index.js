const express = require('express');
const router = express.Router();
const mw = require('../common/middleware/Authentication');
const am = require('./model/Account');

router.get('/', mw.validateSession, (req, res, next)=>{
  am.authenticate(req.query.username, req.query.password).then(data=>{
    res.send(data);
  }).catch(error=>{
    res.send(error);
  });
});

router.post('/', (req, res, next)=>{
  am.create(req.body).then(data=>{
    res.json(data);
  }).catch(error=>{
    res.json(error);
  });
});

module.exports = router;