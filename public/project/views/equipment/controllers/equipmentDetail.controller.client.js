(function () {
    angular
        .module("LoanerApp")
        .controller("equipmentDetailController", equipmentDetailController);

    function equipmentDetailController($routeParams, $location, userService, $rootScope,equipmentService, taskService) {
        var model = this;

        var model = this;
        var userId = $routeParams["userId"];
        var equipmentId = $routeParams["equipmentId"]

        var model = this;
        model.signOut = signOut;
        model.reserveItem = reserveItem;


        function init() {



            equipmentService.findEquipmentById(equipmentId)
                .then(function (response) {
                    model.equipment = response.data;
                    if (model.equipment.kind === "laptop" ) {
                        model.isComputer = "true";
                    }

                });

            userService.findUserById(userId)
                .then(function (response) {
                    model.user = response.data;
                });


        }
        init();

        function signOut() {
            $rootScope.currentUser = null;
            $location.url("/");

        }

        function reserveItem(equipment) {
            taskService.createTask({userId: userId, equipmentId: equipmentId});
            equipmentService.reserveItem(userId, equipmentId, equipment)
                .then(function (res) {
                    model.reserveMeassage = "reserve Successfully, An Admin will deliver it soon";
                }, function (res) {
                    model.reserveError = "Something wrong, please try again";

                })
        }
    }








})();