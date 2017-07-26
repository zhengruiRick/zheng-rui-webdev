(function () {

    angular
        .module("WamApp")
        .controller("loginController", loginController);



    function loginController($location, userService, $rootScope) {
        var model = this;

        model.login = login;

        function init() {

        }
        init();

        function login(user) {
            var user = userService.findUserByCredentials(user.username, user.password);
            if (user === null) {
                model.errorMessage= "Login information incorrect, please try again!"
            }
            else {
                model.welcomeUser = user;
                $rootScope.currentUser = user;
                $location.url("profile/"+ user._id);
            }
        }


    }


})();

