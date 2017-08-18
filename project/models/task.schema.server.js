var mongoose = require("mongoose");

var projectTaskSchema = mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"},
    equipmentId: {type:mongoose.Schema.Types.ObjectId, ref: "ProjectEquipmentModel"}

}, {collection: "projectTask"});


module.exports = projectTaskSchema;

