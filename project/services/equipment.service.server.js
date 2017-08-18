var app = require("../../express");
var equipmentModel = require("../models/equipment.model.server");

var equipments = [
    {_id: "e123", kind: "laptop", name: "Dell 7270#1", detail:"888888", available: true, loanedBy: " ", reservedBy: " "},
    {_id: "e234", kind: "laptop", name: "Dell 7270#2", detail:"999999", available: false, loanedBy: "_234", reservedBy: ""},
    {_id: "e345", kind: "charger", name: "Dell #1", detail: "for all Dell laptop", available: true, loanedBy: " ", reservedBy: " "},
    {_id: "e456", kind: "charger", name: "Dell #2", detail: "for all Dell laptop", available: false, loanedBy: "_234", reservedBy:" "}
];


//http handlers
app.get("/loanerApp/availableEquipmentList", availableEquipmentList);
app.get("/loanerApp/equipment/:equipmentId", getEquipmentById);
app.put("/loanerApp/reserve/:equipmentId", reserveEquipment);
app.get("/loanerApp/reserved/:userId", getReservedEquipmentByUserId);
app.get("/loanerApp/loaned/:userId", getLoanedEquipmentByUserId);
app.get("/loanerApp/allEquipmentList", allEquipmentList);
app.put("/loanerApp/equipment/:equipmentId", updateEquipment);
app.delete("/loanerApp/equipment/:equipmentId", deleteEquipment);
app.post("/loanerApp/equipment/new", createEquipment);

function createEquipment(req, res) {
    var equipment = req.body;

    equipmentModel
        .createEquipment(equipment)
        .then(function (equipment) {
            res.json(equipment);
        })


}

function deleteEquipment(req, res) {
    var equipmentId = req.params.equipmentId;

    equipmentModel
        .deleteEquipment(equipmentId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (status) {
            res.sendStatus(404);
        })
}

function updateEquipment(req, res) {
    var equipmentId = req.params.equipmentId;
    var equipment = req.body;

    equipmentModel
        .updateEquipment(equipmentId, equipment)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        })
}


function allEquipmentList(req, res) {
    equipmentModel
        .findAllEquipmentList()
        .then(function (equipments) {
            res.json(equipments);
        })
}


function getReservedEquipmentByUserId(req, res) {

    var userId = req.params.userId;
    console.log(userId);
    equipmentModel
        .getReservedEquipmentFromUser(userId)
        .then(function (equipments) {
            console.log(equipments);
            res.json(equipments);
        })

}


function getLoanedEquipmentByUserId(req, res) {
    var userId = req.params.userId;

    equipmentModel
        .getLoanedEquipmentFromUser(userId)
        .then(function (equipments) {
            res.json(equipments);
        })
}

function reserveEquipment(req, res) {

   var equipment = req.body;
   var equipmentId = equipment._id;

    equipmentModel
        .updateEquipment(equipmentId, equipment)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        })


}

function availableEquipmentList(req,res) {

    equipmentModel
        .findAvailableEquipmentList()
        .then(function (equipments) {
            res.json(equipments);
        })
}

function getEquipmentById(req, res) {

    equipmentModel.findEquipmentById(req.params.equipmentId)
        .then(function (user) {
            res.json(user);
        });

}

