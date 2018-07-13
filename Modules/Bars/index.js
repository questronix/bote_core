const TAG     = '[Bars]';

const mw      = require('../Common/middleware/Authentication');
const logger  = require('../Common/services/Logger');
const router  = require('express').Router();

const bars    = require('./model/Bars');

router.put('/', mw.isAuthenticated, (req, res) => {
  const ACTION = '[searchBars]';
  logger.log('debug', TAG+ACTION, 'request query: ');

  bars.searchBar(req.body)
  .then( data=>{
    res.success(data);
  }).catch( error=>{
    res.error(error);
  })
});

router.get('/:barname', mw.isAuthenticated, (req, res)=>{
  const ACTION = '[getBar]'
  logger.log('debug', TAG+ACTION, 'request params: ', req.params);

  bars.viewBar(req.params.barname)
  .then( data=>{
    res.success(data);
  })
  .catch( error=>{
    res.error(error);
  })
});

module.exports = router;