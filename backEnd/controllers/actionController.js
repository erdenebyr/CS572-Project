const express = require('express');
const Twitter = require('../models/twitter.model')
const router = express.Router();

module.exports.doAction = async function (req, res) {
    let srcUser = req.body.jwt.userId
    if(req.body.action === "tweet"){
        Twitter.findOneAndUpdate({_id: srcUser},{$push: {
            tweets: { 
                "tweetdate": Date.now(),
                "tweet": req.body.tweet,
                "likes": [],
                "comments": [],
                "retweets": []
             }
            }
        },
        (err, result) => {
            if(result)
                return res.status(200).json({ message: "Successfully tweeted" })
            else
                return res.status(500).json({ error: err })
        })
    }
    if(req.body.action === "follow"){
        let dstUser;
        Twitter.findOne({_id: req.body.targetuserid},{}, function(err, result){
            if(err)
                return res.status(400).json({message: "Following not found"})
            dstUser = result._id
            Twitter.findOneAndUpdate({_id: srcUser},{$addToSet: {
                following: { 
                    "followingid": dstUser.toString()
                 }  
                }
            },
            (err, result) => {
                if(err)
                    return res.status(500).json({ message: "Failed to follow SRC" })
            })
            Twitter.findOneAndUpdate({_id: dstUser},{$addToSet: {
                followers: { 
                    "followerid": srcUser
                 }
                }
            },
            (err, result) => {
                if(err)
                    return res.status(500).json({ message: "Failed to follow DST" })
            })
        });
        return res.status(200).json({ message: "Successful following" })
    }
    if(req.body.action === "unfollow"){
        let dstUser;
        Twitter.findOne({_id: req.body.targetuserid},{}, function(err, result){
            if(err)
                return res.status(400).json({message: "Following not found"})
            dstUser = result._id
            Twitter.findOneAndUpdate({_id: srcUser},{$pull: {
                following: { 
                    "followingid": dstUser.toString()
                 }  
                }
            },
            (err, result) => {
                if(err)
                    return res.status(500).json({ message: "Failed to unfollow DST" })
            })
            Twitter.findOneAndUpdate({_id: dstUser},{$pull: {
                followers: { 
                    "followerid": srcUser
                 }
                }
            },
            (err, result) => {
                if(err)
                    return res.status(500).json({ message: "Failed to unfollow SRC" })
            })
        });
        return res.status(200).json({ message: "Successfully unfollowed" })
    }
    if(req.body.action === "like"){
        Twitter.findOneAndUpdate({ _id: req.body.targetuserid, "tweets._id": req.body.tweetid},{$addToSet: {
            "tweets.$.likes": { 
                likedid: srcUser
             }
            }
        },
        (err, result) => {
            if(result)
                return res.status(200).json({ message: "Successfully liked" })
            else
                return res.status(500).json({ message: "Failed to like" })
        })
    }
    if(req.body.action === "unlike"){
        Twitter.findOneAndUpdate({ _id: req.body.targetuserid, "tweets._id": req.body.tweetid},{$pull: {
            "tweets.$.likes": { 
                likedid: srcUser
             }
            }
        },
        (err, result) => {
            if(result)
                return res.status(200).json({ message: "Successfully unlike" })
            else
                return res.status(500).json({ message: "Failed to unlike" })
        })
    }
    if(req.body.action === "comment"){
        Twitter.findOneAndUpdate({ _id: req.body.targetuserid, "tweets._id": req.body.tweetid},{$push: {
            "tweets.$.comments": { 
                userid: srcUser,
				commentdate: Date.now(),
				comment: req.body.content
             }
            }
        },
        (err, result) => {
            if(result)
                return res.status(200).json({ message: "Successfully commented" })
            else
                return res.status(500).json({ message: "Failed to comment" })
        })
    }
}