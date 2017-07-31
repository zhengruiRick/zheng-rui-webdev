(function () {
    angular
        .module("WamApp")
        .factory("userService", userService);

    function userService($http) {

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

            var url = "/api/user/" +userId;
            return $http.delete(url)
                .then(function (res) {
                    return res.data;
                })

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