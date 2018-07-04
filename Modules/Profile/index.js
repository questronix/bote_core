const TAG = '[Profile]';
const express = require('express');
const router = express.Router();

const mw = require('../common/middleware/Authentication');
const err = require('../common/services/Errors');
const logger = require('../common/services/Logger');

const profile = require('./model/Profile');
const followers = require('./model/Followers');
const following = require('./model/Following');

router.get('/:username', mw.isAuthenticated, (req, res)=>{
  const ACTION = '[getProfile]';
  logger.log('debug', TAG + ACTION + ' request parameters', req.params);
  if (req.params.username === req.user.username){
    profile.getUserProfile(req.user.id)
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

router.get('/:username/following', mw.isAuthenticated, (req, res) => {
  const ACTION = '[getFollowing]';
  logger.log('debug', TAG + ACTION + ' request parameters', req.params);
  following.getFollowing(req.params.username)
    .then( data => {
      res.json(data);
    })
    .catch( error => {
      res.json(error);
    })
  }
);
router.get('/:username/followers', mw.isAuthenticated, (req, res) => {
  const ACTION = '[getFollowers]';
  logger.log('debug', TAG + ACTION + ' request parameters', req.params)
  followers.getFollowers(req.params.username)
    .then( data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    })
  }
);

router.put('/:username', mw.isAuthenticated, (req, res) => {
  const ACTION = '[postEditProfile]';
  logger.log('debug', TAG + ACTION + ' request parameters', req.params)
  logger.log('debug', TAG + ACTION + ' request body', req.body)
  if (req.params.username === req.user.username){
    profile.editUserProfile(req.body, req.user.id)
    .then(data=>{
      res.json(data);
    })
    .catch(error=>{
      res.error(error);
    });
  }else{
    res.json(err.raise('UNAUTHORIZED'));
  }
});

module.exports = router;