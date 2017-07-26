(function () {
    angular
        .module("WamApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams, websiteService, $location) {
        var model = this;

        model.userId = $routeParams.userId;

        model.createWebsite = createWebsite;


        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId);

        }
        init();

        function createWebsite(website) {
            var website = websiteService.createWebsite(model.userId,website);
            $location.url("user/"+ model.userId+"/website");
        }


    }

})();