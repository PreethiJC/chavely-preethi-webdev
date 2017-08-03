/**
 * Created by Zion on 7/19/17.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date, default: Date.now},
    facebook: {
        id:    String,
        token: String
    }
}, {collection: "User"});

module.exports = userSchema;