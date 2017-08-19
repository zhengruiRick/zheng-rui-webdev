(function () {

    angular
        .module("LoanerApp")
        .controller("homeController", homeController);


    function homeController($location, userService,weatherService) {

        var model = this;


        function init() {
            model.login = login;
            model.logout = logout;

            function init() {
                weatherService
                    .getWeather()
                    .then(function (res) {
                        var weatherJson = res.data;
                        model.minTemp = (weatherJson.main.temp_min*9/5 - 459.67).toFixed(2);
                        model.maxTemp = (weatherJson.main.temp_max*9/5 - 459.67).toFixed(2);
                        model.curTemp = (weatherJson.main.temp_temp*9/5 - 459.67).toFixed(2);
                        model.curWea = (weatherJson.weather[0].main);

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

        }

        init();


    }


})();

