var app = require("../../express");
var userModel = require("../models/user.model.server");



//http handlers
app.get("/loanerApp/user", findUser);
app.get("/loanerApp/users", getAllUsers);
app.get("/loanerApp/user/:userId", getUserById);
app.post("/loanerApp/user", createUser);
app.put("/loanerApp/user/:userId", updateUser);
app.delete("/loanerApp/user/:userId", deleteUser);

function deleteUser(req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (status) {
            res.sendStatus(404);
        })


}


function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            rs.sendStatus(404).send(err);
        })

}

function createUser(req, res) {
    var user = req.body;

    user.password = (new Date()).getTime()

    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        })
}


function getAllUsers(req, res) {

    userModel
        .findAllUsers()
        .then(function (users) {
            res.json(users);
        })
}

function getUserById(req, res) {

    userModel
        .findUserById(req.params.userId)
        .then(function (user) {
            res.json(user);
        })
}



function findUser(req,res) {

    var userEmail = req.query.userEmail;
    var password = req.query.password;



    userModel.findUserByCredentials(userEmail, password)
        .then(function (user) {
            if (user != null) {
                res.json(user);
            } else {
                res.send("0");
            }

        }, function (err) {
            res.sendStatus(404).send(err);
        })
}