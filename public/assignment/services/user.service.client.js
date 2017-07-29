(function () {
    angular
        .module("WamApp")
        .factory("userService", userService);

    function userService($http) {
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

            var url = "/api/user/" + userId;

            $http.put(url, user);

            
        }

        function findUserById(userId) {

            return $http.get("/api/user/"+userId);
        }


        function findUserByCredentials(username, password) {

            var url = "/api/user?username="+username+"&password="+password;

            return $http.get(url);



        }

        function createUser(user) {

            var url = "/api/user";

            return $http.post(url, user);




        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;

            return $http.get(url);


        }

    }
})();