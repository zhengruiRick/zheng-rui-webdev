var mongoose = require("mongoose");

var projectEquipmentSchema = mongoose.Schema({
    kind: String,
    String: String,
    name: String,
    detail: String,
    serviceTag: String,
    available: Boolean,
    loanedBy: [{type:mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"}],
    reservedBy: [{type:mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"}],

}, {collection: "projectEquipment"});


module.exports = projectEquipmentSchema;

