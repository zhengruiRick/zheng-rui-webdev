(function () {
    angular
        .module("WamApp")
        .controller("widgetNewController", widgetNewController);

    function pageNewController($routeParams, widgetService,$location) {
        var model = this;


        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;



        model.createWidget = createWidget;
        model.editorUrl = editorUrl;


        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);

        }
        init();

        function createWidget(Widget) {
            var page = widgetService.createPage(model.websiteId,page);
            $location.url("user/"+ model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
        }
        function editorUrl(widgetType) {
            return "views/widget/templates/widget-"+ widgetType+".view.client.html"
        }
    }

})();