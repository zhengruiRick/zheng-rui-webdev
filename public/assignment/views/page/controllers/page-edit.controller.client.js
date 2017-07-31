(function () {

    angular
        .module("WamApp")
        .controller("pageEditController", pageEditController);



    function pageEditController($routeParams,$location, pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        model.deletePage = deletePage;
        model.updatePage = updatePage;



        function init() {

            pageService.findPageById(model.userId, model.websiteId, model.pageId)
                .then(function (page) {
                    model.page = page;
                })

            pageService.findPageByWebsiteId(model.userId, model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                })


        }
        init();

        function deletePage(pageId) {
            pageService.deletePage(model.userId, model.websiteId, pageId)
                .then(function () {
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
                })


        }

        function updatePage(page) {
            pageService.updatePage(model.userId, model.websiteId,model.pageId, page)
                .then(function () {
                    model.updateMessage= "Page update successfully";
                })

        }


    }


})();