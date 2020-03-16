const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating admin schema
var AdminSchema = new Schema({
    username: String,
    password: String,
    email: String
})


module.exports = AdminSchema = mongoose.model('Admin', AdminSchema);