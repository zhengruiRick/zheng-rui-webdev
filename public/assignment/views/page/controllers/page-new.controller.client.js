(function () {
    angular
        .module("WamApp")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, pageService,websiteService,$location) {
        var model = this;

        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;

        model.createPage = createPage;


        function init() {
            pageService.findPageByWebsiteId(model.userId, model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                })

        }
        init();

        function createPage(page) {
            var page = pageService.createPage(model.userId, model.websiteId,page)
                .then(function () {
                    $location.url("user/"+ model.userId+"/website/"+model.websiteId+"/page");
                })

        }
    }

})();