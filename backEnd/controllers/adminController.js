const express = require('express');
const router = express.Router();
const Twitter = require('../models/admin.model')


module.exports.doAction = async function (req, res) {
    if(req.body.action === "tweet"){
        Twitter.findOneAndUpdate({_id: srcUser},{$push: {
            tweets: { 
                "tweetdate": Date.now(),
                "tweet": req.body.tweet,
                "likes": [],
                "comments": [],
                "retweets": [],
                "reports":[]
             }
            }
        },
        (err, result) => {
            if(result)
                return res.status(200).json({ message: result })
            else
                return res.status(500).json({ error: err })
        })
    }
    let srcUser = req.body.jwt.userId
    if(req.body.action === "report"){
    
        Twitter.findOneAndUpdate({ _id: req.body.targetuserid, "tweets._id": req.body.tweetid},{$addToSet: {
            "tweets.$.reports": { 
                userid: srcUser
             }
            }
        },
        (err, result) => {
            if(result)
                return res.status(200).json({ message: "Successfully reported" })
            else
                return res.status(500).json({ message: "Failed to report" })
        })
    }
    if(reports.length> 100){
        delete(tweets);
    }
}
