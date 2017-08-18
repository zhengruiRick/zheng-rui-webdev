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
            if (!(user.password === user.password2)) {
                model.errorMessage= "The passwords are not match, please try again";
            }
            else {
                userService.findUserByUsername(user.username)
                    .then(function (response) {
                        var _user = response.data;
                        if (_user=== "0") {
                            return userService.createUser(user)
                        }
                        else {
                            model.errorMessage= "The username is already exit, please try another one";
                        }
                    })
                    .then(function (res) {
                        var _user = res.data;
                        $location.url("/profile/"+ _user._id);
                    });
            }


        }
    }

})();