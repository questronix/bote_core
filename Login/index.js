const express = require('express');
const router = express.Router();

const mw = require('../common/middleware/Authentication');
const lm = require('./model/Login');

router.post('/', mw.allowLogin, (req, res)=>{
  lm.authenticate(req.body.username, req.body.password)
  .then(data=>{
    req.session.user = data.user;
    res.success(data);
  })
  .catch(error=>{
    res.error(error);
  });
});

module.exports = router;