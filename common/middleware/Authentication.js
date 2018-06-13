module.exports.allowHome = (req, res, next)=>{
  if(typeof req.session.user === 'undefined'){
    //redirect to login page
    res.status(400).send({
      status: 0,
      redirect: 'login'
    });
  }else{
    next();
  }
};

module.exports.allowLogin = (req, res, next)=>{
  if(typeof req.session.user === 'undefined'){
    //allow
    next();
  }else{
    res.status(400).json({
      status: 0,
      redirect: 'home'
    });
  }
};