(function () {
    angular
        .module("LoanerApp")
        .factory("userService", userService);

    function userService($http) {

        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findAllUsers": findAllUsers,
            "createUser": createUser,
            "findUserByUserEmail": findUserByUserEmail,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "checkLogin": checkLogin
        };
        return api;

        function checkLogin() {
            return $http.get("/api/checkLogin")
                .then(function (res) {
                    return res.data;
                })
        }

        function findAllUsers() {
            return $http.get("/loanerApp/users/");

        }

        function deleteUser(userId) {

            var url = "/loanerApp/user/" +userId;
            return $http.delete(url)
                .then(function (res) {
                    return res.data;
                })

        }

        function updateUser(userId, user) {

            var url = "/loanerApp/user/" + userId;

            $http.put(url, user);

            
        }

        function findUserById(userId) {

            return $http.get("/loanerApp/user/"+userId);
        }


        function findUserByCredentials(userEmail, password) {

            var url = "/loanerApp/user?userEmail="+userEmail+"&password="+password;

            return $http.get(url);



        }

        function createUser(user) {

            var url = "/loanerApp/user";

            return $http.post(url, user);




        }

        function findUserByUserEmail(userEmail) {
            var url = "/loanerApp/user?userEmail="+userEmail;

            return $http.get(url);


        }

    }
})();