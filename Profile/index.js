const express = require('express');
const router = express.Router();

const mw = require('../common/middleware/Authentication');
const profile = require('./model/Profile');
const followers = require('./model/Followers');
const following = require('./model/Following');

router.get('/:username', mw.isAuthenticated, (req, res)=>{
  if (req.params.username === req.session.user.username){
    profile.getUserProfile(req.session.user.id)
    .then(data=>{
      res.json(data);
    })
    .catch(error=>{
      res.status(400).json(error);
    });
  }else{
    profile.getOtherProfile(req.params.username)
    .then( data=> {
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
  }
});

module.exports = router;