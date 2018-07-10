const TAG = '[Users]';
const express = require('express');
const router = express.Router();

const mw = require('../Common/middleware/Authentication');
const err = require('../Common/services/Errors');
const logger = require('../Common/services/Logger');

const profile   = require('./model/Profile');
const followers = require('./model/Followers');
const following = require('./model/Following');
const bars      = require('./model/Bars');
const notifs    = require('./model/Notifications');
const bottles   = require('./model/Bottles');

router.get('/:username', mw.isAuthenticated, (req, res)=>{
  if (req.params.username === 'me'){
    const ACTION = '[getProfile Me]';
    logger.log('debug', TAG + ACTION + ' request parameters', req.params);
    profile.getProfile(req.user.username)
    .then(data=>{
      res.success(data);
    })
    .catch(error=>{
      res.error(error);
    });
  }else{
    const ACTION = '[getProfile]';
    logger.log('debug', TAG + ACTION + ' request parameters', req.params);
    profile.getProfile(req.params.username)
    .then( data=> {
      res.success(data);
    })
    .catch(error => {
      res.error(error);
    });
  }
});

router.get('/:username/following', mw.isAuthenticated, (req, res) => {
  const ACTION = '[getFollowing]';
  logger.log('debug', TAG + ACTION + ' request parameters', req.params);

  let uname = req.params.username=='me'? req.user.username:req.params.username;
  following.getFollowing(uname)
    .then( data => {
      res.success(data);
    })
    .catch( error => {
      res.error(error);
    })
  }
);
router.get('/:username/followers', mw.isAuthenticated, (req, res) => {
  const ACTION = '[getFollowers]';
  logger.log('debug', TAG + ACTION + ' request parameters', req.params)

  let uname = req.params.username=='me'? req.user.username:req.params.username;
  followers.getFollowers(uname)
    .then( data => {
      res.success(data);
    })
    .catch(error => {
      res.error(error);
    })
  }
);

router.put('/:username', mw.isAuthenticated, (req, res) => {
  const ACTION = '[postEditProfile]';
  logger.log('debug', TAG + ACTION + ' request parameters', req.params)
  logger.log('debug', TAG + ACTION + ' request body', req.body)

  let uname = req.params.username=='me'? req.user.username:req.params.username;
  if (uname === req.user.username){
    profile.editUserProfile(req.body, req.user.id)
    .then(data=>{
      res.success(data);
    })
    .catch(error=>{
      res.error(error);
    });
  }else{
    res.error(err.raise('UNAUTHORIZED'));
  }
});

router.get('/:username/bars', mw.isAuthenticated, (req, res) => {
  const ACTION = '[getBars]';
  logger.log('debug', TAG + ACTION + ' request parameters ', req.params);
  bars.getBarsVisited(req.user.id)
  .then(data=>{
    res.success(data);
  })
  .catch(error=>{
    res.error(error);
  });
});

router.get('/:username/bottles', mw.isAuthenticated, (req, res) => {
  const ACTION = '[getBottles]';
  logger.log('debug', TAG + ACTION + ' request parameters ', req.params);
  bottles.getInventory(req.user.id)
  .then(data=>{
    res.success(data);
  })
  .catch(error=>{
    res.error(error);
  });
});

router.get('/:username/notifications', mw.isAuthenticated, (req, res) => {
  const ACTION = '[getNotifications]';
  logger.log('debug', TAG+ACTION + 'request parameters ', req.params);

  notifs.getNotifications(req.user.id)
  .then( data=> {
    res.success(data);
  })
  .catch( error=>{
    res.error(error);
  });
});

module.exports = router;