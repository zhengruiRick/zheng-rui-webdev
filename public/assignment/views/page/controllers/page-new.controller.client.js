(function () {
    angular
        .module("WamApp")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, pageService,$location) {
        var model = this;

        model.websiteId = $routeParams.websiteId;
        model.userId = $routeParams.userId;

        model.createPage = createPage;


        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);

        }
        init();

        function createPage(page) {
            var page = pageService.createPage(model.websiteId,page);
            $location.url("user/"+ model.userId+"/website/"+model.websiteId+"/page");
        }
    }

})();