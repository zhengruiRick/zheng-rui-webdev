(function () {
    angular
        .module("WamApp")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, pageService) {
        var model = this;

        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;


        function init() {
            pageService.findPageByWebsiteId(model.userId, model.websiteId)
                .then(function (pages) {
                model.pages = pages;
            })

        }
        init();
    }

})();