const Twitter = require('../models/twitter.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.login = async function (req, res) {
    let fetchedUser;
    Twitter.findOne({ 'username': req.body.username })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Authorization failed"
        });
      }
      fetchedUser = user;
      bcrypt.compare(req.body.password, user.password, (err, same) => {
        if(same){
          const token = jwt.sign(
            {
              username: fetchedUser.username,
              userId: fetchedUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
          );
          return res.status(200).json({
            _token: token,
            _expiresIn: 7200,
            _username: fetchedUser.username,
            message: "Login Successfull."
          })
        }
        else{
          console.log('Wrong password');
          return res.status(401).json({
            message: "Auth Failed"
          })
        }
      });
    })
    .catch(error => {
      return res.status(401).json({
        message: "Auth Failed",
      });
    });
}

module.exports.signup = async function (req, res) {
    bcrypt.hash(req.body.password, 10).then(password => {
        const newTwitter = new Twitter({
          username: req.body.username,
          password: password,
          email: req.body.email,
          dateofbirth: req.body.dateofbirth,
          isActive: true,
          followers: [],
          following: [],
          tweets:[]
        });
        newTwitter
          .save()
          .then(result => {
            res.status(201).json({
              message: "Twitter created!",
              result: result
            });
          })
          .catch(err => {
            res.status(500).json({
              //error: err
            });
          });
      });
}