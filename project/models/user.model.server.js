var mongoose = require("mongoose");
var projectUserSchema = require("./user.schema.server.js");

var projectuserModel= mongoose.model("ProjectUserModel", projectUserSchema);

projectuserModel.createUser = createUser;
projectuserModel.findUserById = findUserById;
projectuserModel.findUserByUserEmail = findUserByUserEmail;
projectuserModel.updateUser= updateUser;
projectuserModel.findUserByCredentials = findUserByCredentials;
projectuserModel.deleteUser = deleteUser;
projectuserModel.findAllUsers = findAllUsers;
// projectuserModel.addEquipment = addEquipment;
// projectuserModel.removeEquipment = removeEquipment;

module.exports= projectuserModel;


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

function deleteUser(userId) {
    return projectuserModel.remove({_id: userId});
}

function findAllUsers() {
    return projectuserModel.find();
}

function createUser(user) {
    return projectuserModel.create(user);
}

function findUserById(userId) {
    return projectuserModel
        .findById(userId);
}

function updateUser(userId,user) {
    return projectuserModel.update({_id:userId},
        {$set: user});
}

function findUserByCredentials(userEmail, password) {
    return projectuserModel.findOne({userEmail: userEmail, password: password})
}

function findUserByUserEmail(userEmail) {
    return projectuserModel.findOne({userEmail: userEmail})
}
