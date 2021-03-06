var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    role: {type:String, enum:["Admin", "generalUser"]},
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type:mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date, default: Date.now},
    google: {
        id: String,
        token: String
    }
}, {collection: "user"});


module.exports = userSchema;

