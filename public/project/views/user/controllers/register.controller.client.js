(function () {

    angular
        .module("LoanerApp")
        .controller("registerController", registerController);

    function registerController(userService, $location) {
        var model = this;

        model.registerUser = registerUser;


        function init() {

        }

        init();

        function registerUser(user) {


            userService.findUserByUserEmail(user.userEmail)
                .then(function (response) {
                    var _user = response.data;
                    if (_user === "0") {
                        return userService.createUser(user)
                    }
                    else {
                        model.errorMessage = "This email is already exit, please try another one";
                    }
                })
                .then(function (res) {
                    var _user = res.data;
                    model.successMessage = "User" + _user.userEmail + " has create successfully with Temp password: " +
                    _user.password + " Please notify the user to change the password on their end";
                });


        }
    }

})();