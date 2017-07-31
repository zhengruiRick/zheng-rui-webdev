(function () {
    angular
        .module("WamApp")
        .factory("pageService", pageService);

    function pageService($http) {

        var api = {
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "deletePage": deletePage,
            "updatePage": updatePage,
            "createPage": createPage
        };
        return api;

        function findPageById(userId, websiteId, pageId) {

            var url = "/api/user/" + userId + "/website/" + websiteId + "/page/" + pageId;
            return $http.get(url)
                .then(function (res) {
                    return res.data;

                });

        }

        function findPageByWebsiteId(userId, websiteId) {

            var url = "/api/user/" + userId + "/website/" + websiteId + "/page";
            return $http.get(url)
                .then(function (res) {
                    return res.data;

                });


        }

        function deletePage(userId, websiteId, pageId) {

            var url = "/api/user/" + userId + "/website/" + websiteId + "/page/"+ pageId;

            return $http.delete(url)
                .then(function (res) {
                    return res.data;
                });

        }

        function updatePage(userId, websiteId, pageId, page) {
            var url = "/api/user/" + userId + "/website/" + websiteId + "/page/"+ pageId;

            return $http.put(url, page)
                .then(function (res) {
                    return res.data;
                })
        }

        function createPage(userId, websiteId, page) {
            var url = "/api/user/" + userId + "/website/" + websiteId + "/page";
            return $http.post(url, page);

        }




    }

    function init() {

    }
    init();

})();