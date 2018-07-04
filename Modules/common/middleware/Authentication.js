const JWT = require('../services/JWT');
const Error = require('../services/Errors');

module.exports.isAuthenticated = (req, res, next)=>{
  //Get access token
  let token = req.headers['x-access-token'];

  //if token doen't exist
  if(!token){
    res.error(Error.raise('NO_ACCESS_TOKEN'));
  }else{
    //verify token
    let jwt = new JWT();
    jwt.verify(token, (err, result)=>{
      if(err){
        //show jwt error
        let error = Error.raise('JWT_ERROR');
        error.error.details = err;
        res.error(error);
      }else{
        //go to next route
        req.user = result;
        next();
      }
    });
  }
};