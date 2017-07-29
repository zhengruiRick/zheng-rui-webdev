var app = require("../express");

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", isAdmin: true},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];

//http handlers
app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);
app.post("/api/user", createUser);
app.put("/api/user/:userId", updateUser);

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;

    for (var u in users) {
        if (users[u]._id === userId) {
            users[u] = user;
            res.send(user);
            return;
        }
    }
    res.sendStatus(404);

}

function createUser(req, res) {
    var user = req.body;
    user._id = "u" + (new Date()).getTime();
    users.push(user);
    res.send(user);
}

function findUser(req,res) {

    var username = req.query.username;
    var password = req.query.password;

    if(username && password) {
        for (var u in users) {
            var _user = users[u];
            if (_user.username === username && _user.password === password) {
                res.send(_user);
                return;
            }
        }
    }
    else if (username) {
        for (var u in users) {
            var _user = users[u];
            if (_user.username === username) {
                res.send(users[u]) ;
                return;
            }

        }

    }
    res.send("0");
}



function getAllUsers(req, responese) {
    responese.send(users);
}

function getUserById(req, responese) {
    for (var u in users) {
        if (users[u]._id === req.params.userId) {
            responese.send(users[u]);
        }

    }
}