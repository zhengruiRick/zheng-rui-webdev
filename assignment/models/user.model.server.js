var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");

var userModel= mongoose.model("UserModel", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.updateUser= updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser = deleteUser;
userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;

module.exports= userModel;

function removeWebsite(userId, websiteId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        })
}

function addWebsite(userId, websiteId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        })
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel
        .findById(userId)
        .populate('websites', 'name');
}

function updateUser(userId,user) {
    return userModel.update({_id:userId},
        {$set: user});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password})
}
function findUserByUsername(username) {
    return userModel.findOne({username: username})
}