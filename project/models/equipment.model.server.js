var mongoose = require("mongoose");
var projectEquipmentSchema = require("./equipment.schema.server.js");

var projectEquipmentModel= mongoose.model("ProjectEquipmentModel", projectEquipmentSchema);
var projectUserModel = require("./user.model.server");

projectEquipmentModel.createEquipment = createEquipment;
projectEquipmentModel.deleteEquipment = deleteEquipment;
projectEquipmentModel.updateEquipment= updateEquipment;
projectEquipmentModel.findAllEquipmentList= findAllEquipmentList;
projectEquipmentModel.getReservedEquipmentFromUser = getReservedEquipmentFromUser;
projectEquipmentModel.getLoanedEquipmentFromUser = getLoanedEquipmentFromUser;
projectEquipmentModel.findAvailableEquipmentList = findAvailableEquipmentList;
projectEquipmentModel.findEquipmentById = findEquipmentById;




module.exports= projectEquipmentModel;


function createEquipment(equipment) {
    return projectEquipmentModel.create(equipment);
}


function deleteEquipment(equipmentId) {
    return projectEquipmentModel.remove({_id: equipmentId});
}

function updateEquipment(equipmentId,equipment) {
    return projectEquipmentModel.update({_id:equipmentId},
        {$set: equipment});
}


function findAllEquipmentList() {
    return projectEquipmentModel.find();
}

function getReservedEquipmentFromUser(userId) {
    return projectEquipmentModel.find({reservedBy: userId});
}

function getLoanedEquipmentFromUser(userId) {
    return projectEquipmentModel.find({loanedBy: userId});
}

function findAvailableEquipmentList() {
    return projectEquipmentModel.find({available: true});
}



function findEquipmentById(equipmentId) {
    return projectEquipmentModel
        .findById(equipmentId);
}

