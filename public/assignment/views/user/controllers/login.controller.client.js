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
            userService.findUserByCredentials(user.username, user.password)
                .then(function (res) {
                user = res.data;
                if (user === "0") {
                    model.errorMessage= "Login information incorrect, please try again!"
                }
                else {
                    model.welcomeUser = user;
                    $rootScope.currentUser = user;
                    $location.url("profile/");
                }

            });

        }


    }


})();

