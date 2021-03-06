(function () {
    angular
        .module("LoanerApp")
        .controller("availableEquipmentListController", availableEquipmentListController);

    function availableEquipmentListController($routeParams, $location, userService,equipmentService, checkLogin) {
        var model = this;
        console.log(checkLogin);

        model.userId = checkLogin._id;

        var model = this;
        model.login = login;
        model.logout = logout;



        function init() {

                userService.findUserById(model.userId)
                    .then(function (res) {
                        var tempUser = res.data;
                        model.user = tempUser;
                    })

            }
            equipmentService
                .findAvailableEquipmentList()
                .then(function (equipments) {
                    model.equipments = equipments.data;

                });


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

        function logout() {
            userService.logout()
                .then(function (res) {
                    $location.url("/");
                })

        }


    }

})();