(function () {
    angular
        .module("LoanerApp")
        .controller("availableEquipmentListController", availableEquipmentListController);

    function availableEquipmentListController($routeParams, $location, userService, $rootScope,equipmentService) {
        var model = this;

        var model = this;
        var userId = $routeParams["userId"];

        var model = this;
        model.login = login;



        function init() {
            if(userId === null) {
                $rootScope.currentUser = null;
            }
            else {
                userService.findUserById(userId)
                    .then(function (res) {
                        var tempUser = res.data;
                        $rootScope.currentUser = tempUser;
                    })

            }
            equipmentService
                .findAvailableEquipmentList()
                .then(function (equipments) {
                    model.equipments = equipments.data;

                });

        }
        init();

        function login(user) {
            userService.findUserByCredentials(user.userEmail, user.password)
                .then(function (res) {
                    user = res.data;
                    if (user === "0") {
                        model.errorMessage= "Login information incorrect, please try again!"
                    }
                    else {
                        model.welcomeUser = user;
                        $rootScope.currentUser = user;
                        var url = "/availableEquipmentList/" + user._id;
                        $location.url(url);
                    }

                });

        }


    }

})();