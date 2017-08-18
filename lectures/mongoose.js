var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/zheng-rui-webdev-test');
var userScheam = mongoose.Schema({
    username:   String,
    first:      String,
    last:       String,
    statues:    {type: String, enum:["MARRIED", "SINGLE"]},
    dob:        Date,
    create:     {type: Date, default: Date.now}
}, {collection: "user"});

var userModel = mongoose.model("UserModel", userScheam);

// createUser({username:"alice"});
// createUser({username:"bob"});

function createUser(user) {
    userModel.create(user, function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(doc);
        }
    });

}
function updateUser(userId, newUser) {
    return userModel.update({_id: userId}, {$set: newUser})
}
function findByUsername(username) {
    return userModel.find({username: username})
}

function findUserById(Id) {
    return userModel.findOne({_id: Id})
}
function removeUser(Id) {
    return userModel.remove({_id:Id})
}

// //removeUser
// removeUser("5988d183c853cb158d3a618c")
//     .then(function (status) {
//         console.log(status);
//     });

////updateUser
// updateUser("5988d183c853cb158d3a618b", {first: "Alice", last: "Wonderland"})
//     .then(function (status) {
//         console.log(status);
//     })

////find user
// findAllUsers()
//     .then(function (users) {
//         console.log(users);
//     })
//
// function findAllUsers() {
//     return userModel.find();
// }
//
// findByUsername("bob")
//     .then(function (user) {
//         console.log(user);
//     })

// findUserById("5988d183c853cb158d3a618c")
//     .then(function (users) {
//         console.log(users);
//     })



