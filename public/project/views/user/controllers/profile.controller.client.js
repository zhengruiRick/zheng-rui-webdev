(function () {

    angular
        .module("LoanerApp")
        .controller("profileController", profileController);



    function profileController($routeParams, $location, userService) {
        var model = this;
        var userId = $routeParams["userId"];
        var adminId = $routeParams["adminId"];

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.adminId = adminId;

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
                })

        }


    }


})();

