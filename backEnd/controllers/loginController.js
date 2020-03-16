const express = require('express');
const Twitter = require('../model/twitter.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

module.exports.login = async function (req, res) {
    let fetchedUser;
    console.log(req.body.username);

    Twitter.findOne({ 'username': req.body.username })
    .then(user => {
      console.log(user);
      if (!user) {
        return res.status(401).json({
          message: "Authorization failed"
        });
      }
      fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      console.log(result);
      if (!result) {
       // res.status(401).json({
        //  message: "Worng password"
        //});
        console.log('wrong password');
      }
      console.log("I am here");
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
      });
    })
    .catch(error => {
      return res.status(401).json({
        message: "Auth Failed",
        error: error
      });
    });
}

module.exports.signup = async function (req, res) {
    bcrypt.hash(req.body.password, 10).then(password => {
        const user = new Twitter({
          username: req.body.username,
          password: password,
          email: req.body.email,
          dateofbirth: req.param.dob,
          isActive: true,
          followers: [],
          following: [],
          tweets:[]
        });
    
        Twitter
          .save()
          .then(result => {
            res.status(201).json({
              message: "Twitter created!",
              result: result
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
      });
}