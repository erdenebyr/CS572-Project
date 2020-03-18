const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports.checkAuth = async function (req, res, next) {
      //if token exists, proceed, otherwise terminate
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            console.log('Invalid Token')
            next(new Error("Invalid Token"));
          }
          if(req.method == "POST")
            req.body.jwt = decoded;
          next();
        })
      }
      else {
        console.log('no token')
        next(new Error("No Token"));
      }
}