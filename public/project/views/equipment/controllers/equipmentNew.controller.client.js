(function () {
    angular
        .module("LoanerApp")
        .controller("equipmentNewController", equipmentNewController);

    function equipmentNewController($routeParams, $location, userService, $rootScope,equipmentService,$location) {
        var model = this;


        model.adminId = $routeParams["adminId"];

        model.signOut = signOut;
        model.createEquipment = createEquipment;



        function init() {


        }
        init();

        function signOut() {
            $rootScope.currentUser = null;
            $location.url("/");

        }

        function createEquipment(equipment) {
            console.log(equipment);
            equipmentService.newEquipment(equipment);
            model.updateMeassage = "create successfully";
        }

    }








})();