(function () {

    angular
        .module("WamApp")
        .controller("registerController", registerController);

    function registerController(userService, $location) {
        var model = this;

        model.registerUser = registerUser;

        function init() {

        }

        init();

        function registerUser(user) {
            var _user = userService.findUserByUsername(user.username);

            if (!(user.password === user.password2)) {
                model.errorMessage= "The passwords are not match, please try again";
            }
            else if (!_user) {
                var user = userService.registerUser(user);
                $location.url("/profile/"+user._id);

            }
            else {
                model.errorMessage= "The username is already exit, please try another one";


            }
        }
    }

})();