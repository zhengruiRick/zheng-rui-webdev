(function () {

    angular
        .module("LoanerApp")
        .controller("changePasswordController", changePasswordController);



    function changePasswordController($routeParams, $location, userService, checkLogin) {
        var model = this;
        var userId = checkLogin._id;

        model.updateUser = updateUser;
        model.changePassword = changePassword;
        model.deleteUser = deleteUser;

        function init() {
            userService.findUserById(userId)
                .then(function (response) {
                model.user = response.data;
            });
        }
        init();

        function changePassword(password1, password2) {
            if (password1 === password2) {
                var newUser = model.user;
                newUser.password = password1;
                userService.updateUser(model.user._id, newUser);
                model.updateMessage= "password change successfully"

            } else {
                model.errorMessage = "Two passwords are not Match, please try again"
            }
        }

        function updateUser(user) {
            userService.updateUser(model.user._id, user);
            model.updateMessage= "User profile update successfully"
        }

        function deleteUser() {
            userService.deleteUser(model.user._id)
                .then(function () {
                    model.deleteMessage= "User removed successfully";
                    $location.url("/login");
                })

        }


    }


})();

