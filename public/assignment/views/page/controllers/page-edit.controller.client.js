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

            model.page = pageService.findPageById(model.pageId);
            model.pages = pageService.findPageByWebsiteId(model.websiteId);


        }
        init();

        function deletePage(pageId) {
            pageService.deletePage(pageId);
            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");

        }

        function updatePage(page) {
            pageService.updatePage(model.pageId, page);
            model.updateMessage= "Page update successfully";
        }


    }


})();