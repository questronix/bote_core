const express = require('express');
const router = express.Router();

const mw = require('../common/middleware/Authentication');
const pm = require('./model/Profile');

router.get('/', mw.allowHome, (req, res)=>{
  pm.getUserProfile(req.session.user.id)
  .then(data=>{
    res.json(data);
  })
  .catch(error=>{
    res.status(400).json(error);
  });
});

module.exports = router;