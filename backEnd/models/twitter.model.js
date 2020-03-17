const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

// create User schema
var TwitterSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        dateofbirth: Date,
        isActive: Boolean,
        followers: [],
        following: [],
        tweets:[
            {
                tweetdate: Date,
                tweet: String,
                likes: [],
                comments: [
                    {
                        userid: String,
                        commentdate: Date,
                        comment: String
                    }
                ],
                retweets: []
            }
        ]
    }
)

TwitterSchema.plugin(uniqueValidator);
module.exports =  mongoose.model('ColTwitter', TwitterSchema);