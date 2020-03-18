const express = require('express');
const Twitter = require('../models/twitter.model')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require("bcrypt");

module.exports.getProfile = async function (req, res) {
    await Twitter.findOne({username: req.params.username})
    .then(result => {
        return res.status(200).json({
            data: result
          });
    })
    .catch(err => {
        return res.status(401).json({
          data: err
        });
    }) 
}

module.exports.getFollowers = async function (req, res) {
    console.log("FOLOWERS USERNAME: ", req.params.username)
    try{
        let result = await Twitter.findOne({username: req.params.username},{"followers":1})
        return res.json({data: result})
    } catch(err){
        return res.json({error: err})
    }
}

module.exports.getFollowing = async function (req, res) {
    console.log("FOLLOWING USERNAME: ", req.params.username)
    try{
        let result = await Twitter.findOne({username: req.params.username},{"following":1})
        return res.json({data: result})
    } catch(err){
        return res.json({error: err})
    }
}

module.exports.getTweetDetail = async function (req, res) {
    try{
        let result = await Twitter.aggregate([{$match: {username: req.params.username}},{$unwind: "$tweets"},{$match: {"tweets._id": ObjectId(req.params.tweetid)}}])
        return res.json({data: result})
    } catch(err){
        return res.json({error: err})
    }
}

module.exports.editProfile = async function (req, res) {
    let newPassword
    await bcrypt.hash(req.body.password, 10).then(password => {
        newPassword = password
        });
    await Twitter.findOneAndUpdate({_id: req.body.jwt.userId},{$set: {
        email: req.body.email,
        password: newPassword,
        dateofbirth: req.body.dateofbirth
        }
    },
    (err, result) => {
        if(result)
            return res.status(200).json({ message: "Successfully editted" })
        else
            return res.status(500).json({ error: err })
    })
}