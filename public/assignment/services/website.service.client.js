(function () {
    angular
        .module("WamApp")
        .factory("websiteService", websiteService);

    function websiteService($http) {



        var api = {
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "deleteWebsite": deleteWebsite,
            "updateWebsite": updateWebsite,
            "createWebsite": createWebsite
        };
        return api;

        function findWebsiteById(userId, websiteId) {

            var url = "/api/user/"+ userId + "/website/" + websiteId;
            return $http.get(url)
                .then(function (res) {
                    return res.data;

                });


        }
        
        function findWebsitesByUser(userId) {

            var url = "/api/user/"+ userId + "/website";
            return $http.get(url)
                .then(function (res) {
                    return res.data;

                });

        }

        function deleteWebsite(userId, websiteId) {

            var url = "/api/user/" + userId +"/website/" + websiteId;

            return $http.delete(url)
                .then(function (res) {
                    return res.data;
                });


        }

        function updateWebsite(userId, websiteId, website) {

            var url = "/api/user/" + userId +"/website/" + websiteId;

            return $http.put(url, website)
                .then(function (res) {
                    return res.data;
                })

        }

        function createWebsite(userId, website) {

            var url = "/api/user/"+ userId + "/website";
            return $http.post(url, website);




        }




    }

    function init() {

    }
    init();

})();