(function () {

    angular
        .module("LoanerApp")
        .controller("adminViewController", adminViewController);



    function adminViewController($location, userService, taskService, equipmentService,$routeParams, $rootScope) {
        var model = this;
        var userId = $routeParams["userId"];


        function init() {

            model.signOut =signOut;
            model.adminId = userId;
            model.deleteTask = deleteTask;

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
            taskService.findAllTasks()
                .then(function (res) {
                model.tasks = res.data;

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

        function deleteTask(taskId) {
            taskService.deleteTask(taskId);
            $location.url("#!/admin/"+ userId);

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

