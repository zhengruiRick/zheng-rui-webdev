(function () {
    angular
        .module("WamApp")
        .factory("widgetService", widgetService);

    function widgetService($http) {


        var api = {
            "findWidgetByPageId": findWidgetByPageId,
            "findWidgetById": findWidgetById,
            "deleteWidget": deleteWidget,
            "updateWidget": updateWidget,
            "createWidget": createWidget,
            "sortWidget": sortWidget
        };
        return api;

        function findWidgetById(userId, websiteId, pageId, widgetId) {
            var url = "/api/user/" + userId + "/website/" + websiteId + "/page/" + pageId +"/widget/" + widgetId;
            return $http.get(url)
                .then(function (res) {
                    return res.data;

                });


        }

        function findWidgetByPageId(userId, websiteId, pageId) {
            var url = "/api/user/" + userId + "/website/" + websiteId + "/page/" +pageId +"/widget";
            return $http.get(url)
                .then(function (res) {
                    return res.data;

                });
        }

        function deleteWidget(userId, websiteId, pageId, widgetId) {
            var url = "/api/user/" + userId + "/website/" + websiteId + "/page/" + pageId +"/widget/" + widgetId;
            return $http.delete(url);
        }

        function updateWidget(userId, websiteId, pageId, widgetId, widget) {
            var url = "/api/user/" + userId + "/website/" + websiteId + "/page/" + pageId +"/widget/" + widgetId;

            return $http.put(url, widget)
                .then(function (res) {
                    return res.data;
                })
        }

        function createWidget(userId, websiteId, pageId, widget) {

            var url = "/api/user/" + userId + "/website/" + websiteId + "/page/" + pageId +"/widget";
            return $http.post(url, widget)
                .then(function (res) {
                    return res.data;
                });



        }


        function sortWidget(pageId, initial, final) {
            var url = "/api/page/" + pageId + "/widget?initial=" + initial + "&final="+final;
            return $http.put(url)
                .then(function(res) {
                return res.data;
            });
        }




    }

    function init() {

    }
    init();

})();