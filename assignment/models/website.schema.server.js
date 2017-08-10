var mongoose = require("mongoose");

var websiteSchema = mongoose.Schema({
    name: String,
    description: String,
    developer: {type:mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    pages: [{type:mongoose.Schema.Types.ObjectId, ref: "PageModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "website"});


module.exports = websiteSchema;
