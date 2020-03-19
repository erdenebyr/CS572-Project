const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating admin schema
var AdminSchema = new Schema({

    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
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
            retweets: [],
            reports:[{
                userid:string
            }]
        }
    ]
})


module.exports = AdminSchema = mongoose.model('Admin', AdminSchema);