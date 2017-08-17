(function () {

    angular
        .module("LoanerApp")
        .controller("adminViewController", adminViewController);



    function adminViewController($location, userService, equipmentService,$routeParams, $rootScope) {
        var model = this;
        var userId = $routeParams["userId"];


        function init() {

            model.signOut =signOut;
            model.adminId = userId;

            userService.findUserById(userId)
                .then(function (response) {
                    model.user = response.data;
                });
            userService.findAllUsers()
                .then(function (res) {
                    model.users = res.data;
                })
            equipmentService.findAllEquipmentList()
                .then(function (res) {
                    model.equipments = res.data;

                })
        }
        init();

        // function urlToRegisterUser() {
        //     $location.url("#!/registerUser");
        //
        // }

        function signOut() {
            $rootScope.currentUser = null;
            $location.url("/");
        }

        // function login(user) {
        //     userService.findUserByCredentials(user.userEmail, user.password)
        //         .then(function (res) {
        //         user = res.data;
        //         if (user === "0") {
        //             model.errorMessage= "Login information incorrect, please try again!"
        //         }
        //         else {
        //             model.welcomeUser = user;
        //             $rootScope.currentUser = user;
        //             $location.url("/");
        //         }
        //
        //     });
        //
        // }


    }


})();

