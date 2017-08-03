(function () {
    angular
        .module("omdbApp", ["ngRoute"])
        .controller("searchController", searchController)
        .controller("detailsController", detailsController)
        .service("movieService", movieService)
        .config(configuration);
    
    function searchController(movieService) {
        var model = this;

        model.searchMovieByTitle = searchMovieByTitle;


        function init() {

        }
        init();

        function searchMovieByTitle(movieTitle) {
            movieService.searchMovieByTitle(movieTitle)
                .then(render);
        }

        function render(movies) {
            model.movies = movies;
        }
        
    }
    
    function detailsController($routeParams, movieService) {
        var model = this;

        var rmdbID = $routeParams.rmdbID;

        function init() {


            movieService.searchMovieByID(rmdbID)
                .then(renderMovie);

        }
        init();

        function renderMovie(movie) {
            model.movie = movie;
        }
        
    }
    
    function movieService($http) {

        this.searchMovieByTitle = searchMovieByTitle;
        this.searchMovieByID = searchMovieByID;
        
        function searchMovieByTitle(movieTitle) {

            var url = "http://www.omdbapi.com/?s=" + movieTitle+"&apikey=852159f0";

            return $http.get(url)
                .then(function (res) {
                    return res.data;
                })
            
        }

        function searchMovieByID(movieID) {

            var url = "http://www.omdbapi.com/?i="+ movieID+"&apikey=852159f0";

            return $http.get(url)
                .then(function (res) {
                    return res.data;
                })

        }
        
    }

    function configuration ($routeProvider) {
        $routeProvider
            .when("/",{
                templateUrl: "search.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/details/:rmdbID", {
                templateUrl: "details.html",
                controller: "detailsController",
                controllerAs: "model"
            })
    }


})();