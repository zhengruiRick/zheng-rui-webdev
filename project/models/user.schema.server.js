var mongoose = require("mongoose");

var projectUserSchema = mongoose.Schema({
    userEmail: String,
    password: String,
    firstName: String,
    lastName: String,
    loanList: [{type:mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"}],
    reserveList: [{type:mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"}],
    isAdmin: Boolean,
    google: {
        id: String,
        token: String
    }
}, {collection: "projectUser"});


module.exports = projectUserSchema;

