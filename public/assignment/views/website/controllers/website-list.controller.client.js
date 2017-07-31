(function () {
    angular
        .module("WamApp")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService) {
        var model = this;

        model.userId = $routeParams.userId;


        function init() {
            websiteService
                .findWebsitesByUser(model.userId)
                .then(function (webstites) {
                    model.websites = webstites;

                });

        }
        init();


    }

})();