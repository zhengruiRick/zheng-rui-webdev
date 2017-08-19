(function () {

    angular
        .module("LoanerApp")
        .controller("homeLoginController", homeLoginController);


    function homeLoginController($location, userService, equipmentService, $routeParams, weatherService, checkLogin) {

        var model = this;

        model.userId = checkLogin._id;


        function init() {
            model.login = login;
            model.logout = logout;
            model.adminLink = adminLink;

            function init() {
                weatherService
                    .getWeather()
                    .then(function (res) {
                        var weatherJson = res.data;
                        console.log(weatherJson)
                        model.minTemp = (weatherJson.main.temp_min * 9 / 5 - 459.67).toFixed(2);
                        model.maxTemp = (weatherJson.main.temp_max * 9 / 5 - 459.67).toFixed(2);
                        model.curTemp = (weatherJson.main.temp_temp * 9 / 5 - 459.67).toFixed(2);
                        model.curWea = (weatherJson.weather[0].main);

                    })


                equipmentService
                    .findReservedEquipmentByUserId(model.userId)
                    .then(function (res) {
                        model.reservedEquipments = res.data;
                    });

                equipmentService.findLoanedEquipmentByUserId(model.userId)
                    .then(function (res) {
                        model.loanedEquipments = res.data;
                    });
                userService.findUserById(model.userId)
                    .then(function (res) {
                        model.user = res.data;
                    })


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
                            var url = "/user/";
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

            function adminLink(user) {
                var url = "/admin/" + user._id;
                $location.url(url);
            }

        }

        init();


    }


})();

