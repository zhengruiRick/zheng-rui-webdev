(function () {
    angular
        .module("WamApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams, websiteService, $location) {
        var model = this;

        model.userId = $routeParams.userId;

        model.createWebsite = createWebsite;


        function init() {
            websiteService.findWebsitesByUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;

                });

        }
        init();

        function createWebsite(website) {
            websiteService
                .createWebsite(model.userId,website)
                .then(function () {
                    $location.url("user/"+ model.userId+"/website");
                })

        }


    }

})();