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
                var promise = userService.findUserByUsername(user.username);
                promise
                    .then(function (response) {
                        var _user = response.data;

                        if (_user=== "0") {
                            var promise2 = userService.createUser(user);
                            promise2
                                .then(function (res) {
                                    var _user = res.data;
                                    $location.url("/profile/"+ _user._id);
                                });


                        }
                        else {
                            model.errorMessage= "The username is already exit, please try another one";


                        }

                    })
            }


        }
    }

})();