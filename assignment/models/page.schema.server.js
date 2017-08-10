var mongoose = require("mongoose");

var pageSchema = mongoose.Schema({
    name: String,
    title: String,
    description: String,
    websiteId: {type:mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"},
    // widgets: [{type:mongoose.Schema.Types.ObjectId, ref: "WidgetModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "page"});


module.exports = pageSchema;



