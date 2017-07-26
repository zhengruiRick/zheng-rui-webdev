(function () {
    angular
        .module("WamApp")
        .factory("userService", userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", isAdmin: true},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];
        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "createUser": createUser,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function deleteUser(userId) {
            for(var i = 0; i < users.length; i++) {
                if(users[i]._id == userId) {
                    users.splice(i, 1);
                    return users;
                }
            }
            return null;
        }
        
        function updateUser(userId, user) {
            for (var u in users) {
                if (users[u]._id === userId) {
                    users[u] = user;
                    return;
                }
            }
            return null;
            
        }

        function findUserById(userId) {

            for (var u in users) {
                if (users[u]._id === userId) {
                    return users[u];
                }
            }
            return null;
        }


        function findUserByCredentials(username, password) {

            for (var u in users) {
                var _user = users[u];
                if (_user.username === username && _user.password === password) {
                    return _user;

                }
            }
            return null;

        }

        function createUser(user) {
            user._id = (new Date()).getTime() + "";

            users.push(user);
            return user;


        }

        function findUserByUsername(username) {

            for (var u in users) {
                var _user = users[u];
                if (_user.username === username) {
                    return users[u];

                }

            }
            return null;

        }

    }
})();