const express = require('express');
const Twitter = require('../models/twitter.model')
const jwt = require('jsonwebtoken')
var jwtDecode = require('jwt-decode')
const router = express.Router();

module.exports.getHome = async function (req, res) {
    let userid = jwtDecode(req.headers.authorization.split(' ')[1]).userId;
    await Twitter.find({_id: userid})
    .then(result => {
      return res.status(200).json({
        data: result
      });
    })
    .catch(error => {
      return res.status(500).json({
        error: error
      });
    });
}

module.exports.searchUser = async function (req, res) {
    
}