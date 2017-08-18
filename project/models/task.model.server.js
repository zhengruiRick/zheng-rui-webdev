var mongoose = require("mongoose");
var projectTaskSchema = require("./task.schema.server.js");

var projectTaskModel= mongoose.model("ProjectTaskModel", projectTaskSchema);

projectTaskModel.createTask = createTask;
projectTaskModel.deleteTask = deleteTask;
projectTaskModel.findAllTasks = findAllTasks;

// projectuserModel.addEquipment = addEquipment;
// projectuserModel.removeEquipment = removeEquipment;

module.exports= projectTaskModel;


// function removeEquipment(userId, websiteId) {
//     return userModel
//         .findUserById(userId)
//         .then(function (user) {
//             var index = user.websites.indexOf(websiteId);
//             user.websites.splice(index, 1);
//             return user.save();
//         })
// }

// function addEquipment(userId, websiteId) {
//     return userModel
//         .findUserById(userId)
//         .then(function (user) {
//             user.websites.push(websiteId);
//             return user.save();
//         })
// }

function deleteTask(taskId) {
    return projectTaskModel.remove({_id: taskId});
}


function createTask(task) {
    return projectTaskModel.create(task);
}

function findAllTasks() {
    return projectTaskModel.find();
}

