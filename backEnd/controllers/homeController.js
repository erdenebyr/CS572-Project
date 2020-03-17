const { of } = require('rxjs');
const forEach = require('async-foreach').forEach;
const { map, filter, flatMap } = require('rxjs/operators');
const express = require('express');
const Twitter = require('../models/twitter.model')
const jwt = require('jsonwebtoken')
var jwtDecode = require('jwt-decode')
const router = express.Router();

 

module.exports.getHome = async function (req, res) {

    let results = []
    let users = []
    let userid = jwtDecode(req.headers.authorization.split(' ')[1]).userId;
    users.push(userid)
    await Twitter.find({_id: userid},{"_id": 0, "following": 1 })

    .then(result => {
        of((result[0]).following).forEach(obj => {
            obj.forEach(e => {
                users.push(e.followingid)

            })

        })
    })

    .catch(error => {
      return res.status(500).json({
        message: "Failure in the homeController"

      });
    });

    forEach(users, uid => {

        Twitter.findOne({ _id: uid }, { "username": 1, "tweets": 1 })
          .then(result => {
            console.log("HSHH", JSON.stringify(result));
            results.push(result);
            if (users.length === results.length)
              return res.status(200).json({
                data: results

              });

          })

          .catch(err => {
            return res.status(401).json({
              data: err
            });

        });
    });

}

module.exports.searchUser = async function (req, res) {

await Twitter.find({username: {$regex: req.params.username}},{"username": 1})

.then(result => {

return res.status(200).json({
data: result
})
})
}