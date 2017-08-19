(function () {
    angular
        .module("LoanerApp")
        .factory("userService", userService);

    function userService($http) {

        var api = {
            "findUserByCredentials": login,
            "findUserById": findUserById,
            "findAllUsers": findAllUsers,
            "createUser": createUser,
            "findUserByUserEmail": findUserByUserEmail,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "checkLogin": checkLogin,
            "logout": logout,
        };
        return api;

        function logout() {
            return $http.get("/loanerApp/logout");

        }

        function checkLogin() {
            return $http.get("/loanerApp/checkLogin")
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


        // function findUserByCredentials(userEmail, password) {
        //
        //     var url = "/loanerApp/user?userEmail="+userEmail+"&password="+password;
        //
        //     return $http.get(url);
        //
        //
        //
        // }

        function login(userEmail, password) {

            var url = "/loanerApp/login";

            return $http.post(url, {username: userEmail, password:password});



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