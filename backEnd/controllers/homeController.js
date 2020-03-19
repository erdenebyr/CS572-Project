const { of } = require('rxjs');
const forEach = require('async-foreach').forEach;
const express = require('express');
const Twitter = require('../models/twitter.model')
var jwtDecode = require('jwt-decode')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports.getHome = async function (req, res) {
  let results = []
  let users = []
  let userid = jwtDecode(req.headers.authorization.split(' ')[1]).userId;
  users.push(userid)
  await Twitter.find({ _id: userid }, { "_id": 0, "following": 1 })
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
  await Twitter.find({ username: { $regex: req.params.username } }, { "username": 1 })
    .then(result => {
      return res.status(200).json({
        data: result
      })
    })
}

module.exports.getSuggest = async function (req, res) {
  let userid = jwtDecode(req.headers.authorization.split(' ')[1]).userId;
  let ignoreduser =[]
  ignoreduser.push(ObjectId(userid))
  try {
    await Twitter.find({_id: userid},{"_id": 0, "following": 1})
    .then(result => {
      of((result[0]).following).forEach(obj => {
        obj.forEach(e => {
          ignoreduser.push(ObjectId(e.followingid))
        })
      })
    })

    let result = await Twitter.aggregate([
      {
        $project: {
          username: 1,
          followersnumber: { $size: "$followers" }
       } 
      }, 
      {   
          $sort: {"followersnumber": -1} 
      },
      {
        
         $match: {
           _id: { $nin: ignoreduser}
         }
        
      },
      {
        $limit: 100
      },
      {
        $project: {
          username: 1,
       } 
      }
    ])
    return res.json({ data: result })
  } catch (err) {
    return res.json({ error: err })
  }
}
