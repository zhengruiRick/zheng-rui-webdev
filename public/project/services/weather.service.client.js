(function () {
    angular
        .module("LoanerApp")
        .service("weatherService", weatherService);

    function weatherService($http) {


        this.getWeather = getWeather;

        function getWeather() {
            var url = "http://api.openweathermap.org/data/2.5/weather?zip=02115,us&appid=65a2bec5fa1afbe73df128dc3481f506";

            return $http.get(url)

        }

        function init() {

        }

        init();


    }



})();