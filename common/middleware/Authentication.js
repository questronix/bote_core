module.exports.validateSession = (req, res, next)=>{
  req.session.user = {status: 1};
  if(typeof req.session.user === 'undefined'){
    res.status(403).send({
      error: 'Unauthorized Access'
    });
  }else{
    next();
  }
};