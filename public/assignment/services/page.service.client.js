(function () {
    angular
        .module("WamApp")
        .factory("pageService", pageService);

    function pageService() {

        var pages = [
            { _id: "321", name: "Post 1", websiteId: "456", description: "Lorem" },
            { _id: "432", name: "Post 2", websiteId: "456", description: "Lorem" },
            { _id: "543", name: "Post 3", websiteId: "456", description: "Lorem" }
        ];


        var api = {
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "deletePage": deletePage,
            "updatePage": updatePage,
            "createPage": createPage
        };
        return api;

        function findPageById(pageId) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    return pages[p];
                }
            }
            return null;

        }

        function findPageByWebsiteId(WebsiteId) {
            var _pages =[];

            for (var p in pages) {
                if(pages[p].websiteId === WebsiteId) {
                    _pages.push(pages[p]);
                }
            }
            return _pages;
        }

        function deletePage(pageId) {
            var page = findPageById(pageId);
            var index = pages.indexOf(page);
            pages.splice(index,1);

        }

        function updatePage(pageId, page) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    pages[p] = page;
                    return;
                }
            }
            return null;
        }

        function createPage(websiteId, page) {
            page._id = null;

            page._id =  (new Date()).getTime() + "123";
            page.websiteId = websiteId;
            pages.push(page);
            return page;



        }




    }

    function init() {

    }
    init();

})();