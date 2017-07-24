(function () {

    angular
        .module("WamApp")
        .controller("profileController", profileController);



    function profileController($routeParams, userService) {
        var model = this;
        var userId = $routeParams["userId"];

        model.updateUser = updateUser;
        model.unregister = unregister;

        function init() {
            model.user = userService.findUserById(userId);
        }
        init();

        function updateUser(user) {
            userService.updateUser(model.user._id, user);
            model.updateMessage= "User profile update successfully"
        }

        function unregister() {

        }


    }


})();

