(function () {
    angular
        .module("LoanerApp")
        .controller("availableEquipmentListViewController", availableEquipmentListViewController);

    function availableEquipmentListViewController($location, userService, $rootScope,equipmentService) {
        var model = this;

        var model = this;

        var model = this;
        model.login = login;



        function init() {

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
                        var url = "/availableEquipmentList/user";
                        $location.url(url);
                    }

                });

        }


    }

})();