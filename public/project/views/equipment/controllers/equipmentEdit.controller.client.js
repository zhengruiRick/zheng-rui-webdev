(function () {
    angular
        .module("LoanerApp")
        .controller("equipmentEditController", equipmentEditController);

    function equipmentEditController($routeParams, $location, userService, $rootScope,equipmentService,$location) {
        var model = this;


        model.adminId = $routeParams["adminId"];
        model.equipmentId = $routeParams["equipmentId"];

        model.signOut = signOut;
        model.updateEquipment = updateEquipment;
        model.deleteEquipment = deleteEquipment;



        function init() {



            equipmentService.findEquipmentById(model.equipmentId)
                .then(function (response) {
                    model.equipment = response.data;

                    if (model.equipment.kind === "laptop" ) {
                        model.isComputer = "true";
                    }

                });


        }
        init();

        function signOut() {
            $rootScope.currentUser = null;
            $location.url("/");

        }

        function updateEquipment(equipment) {
            equipmentService.updateEquipment(model.equipmentId, equipment);
            model.updateMeassage = "Update successfully";
        }
        function deleteEquipment() {
            equipmentService.deleteEquipment(model.equipmentId)
                .then(function (res) {

                    var url = "admin/" + model.adminId;
                    $location.url(url);
                })


        }
    }








})();