(function () {
    angular
        .module("WamApp")
        .service("flickrService", flickrService);

    function flickrService($http) {

        this.searchPhotos = searchPhotos;

        var key = "eb54d664a325b14f94450c6835d4752c";
        var secret = "cd183a18c5bbffe7";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }


    }

    function init() {

    }

    init();

})();