const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

// create User schema
var TwitterSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        dob: Date,
        isActive: Boolean,
        followers: [
            {
                userid: String
            }
        ],
        following: [
            {
                userid: String
            }
        ],
        tweets:[
            {
                tweetdate: Date,
                tweet: String,
                likes: [
                    {
                        userid: String
                    }
                ],
                comments: [
                    {
                        userid: String,
                        commentdate: Date,
                        comment: String
                    }
                ],
                retweets: [
                    {
                        userid: String
                    }
                ]
            }
        ]
    }
)

TwitterSchema.plugin(uniqueValidator);
module.exports = TwitterSchema = mongoose.model('colTwitter', TwitterSchema);