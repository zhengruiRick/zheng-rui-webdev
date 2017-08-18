(function () {

    angular
        .module("LoanerApp")
        .controller("homeController", homeController);


    function homeController($location, userService, $rootScope, equipmentService, $routeParams,weatherService) {
        var model = this;
        var userConfirm = false;

        if ($routeParams.userId) {
            userConfirm = true;
            var userId = $routeParams.userId;
        }


        function init() {
            model.login = login;
            model.signOut = signOut;
            model.adminLink = adminLink;

            function init() {
                weatherService
                    .getWeather()
                    .then(function (res) {
                        var weatherJson = res.data;
                        console.log(weatherJson)
                        model.minTemp = (weatherJson.main.temp_min*9/5 - 459.67).toFixed(2);
                        model.maxTemp = (weatherJson.main.temp_max*9/5 - 459.67).toFixed(2);
                        model.curTemp = (weatherJson.main.temp_temp*9/5 - 459.67).toFixed(2);
                        model.curWea = (weatherJson.weather[0].main);

                    })



                if (userConfirm) {
                    equipmentService
                        .findReservedEquipmentByUserId(userId)
                        .then(function (res) {
                            model.reservedEquipments = res.data;
                        });

                    equipmentService.findLoanedEquipmentByUserId(userId)
                        .then(function (res) {
                            model.loanedEquipments = res.data;
                        });

                    }
            }

            init();

            function login(user) {
                userService.findUserByCredentials(user.userEmail, user.password)
                    .then(function (res) {
                        user = res.data;
                        if (user === "0") {
                            $location.url("/login");
                        }
                        else {
                            $rootScope.currentUser = user;
                            var url = "/user/" + user._id;
                            $location.url(url);
                        }

                    });
            }

            function signOut() {
                $rootScope.currentUser = null;
                $location.url("#!/");
            }

            function adminLink(user) {
                var url = "/admin/" + user._id;
                $location.url(url);
            }

        }

        init();


    }


})();

