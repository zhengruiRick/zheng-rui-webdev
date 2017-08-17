(function () {

    angular
        .module("WamApp")
        .controller("profileController", profileController);



    function profileController($routeParams, $location, userService, checkLogin) {
        var model = this;
        var userId = checkLogin._id//$routeParams["userId"];

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            userService.findUserById(userId)
                .then(function (response) {
                model.user = response.data;
            });
        }
        init();

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

