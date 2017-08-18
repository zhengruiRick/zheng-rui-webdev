(function () {
    angular
        .module("WamApp")
        .controller("widgetListController", widgetListController);


    function widgetListController($sce,$routeParams,widgetService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        model.trustHtmlContent = trustHtmlContent;
        model.trustUrlResource = trustUrlResource;
        model.getWidgetIncludeUrl = getWidgetIncludeUrl;
        model.sortWidget = sortWidget;


        function init() {
            widgetService.findWidgetByPageId(model.userId, model.websiteId, model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                })

        }
        init();

        function sortWidget(initial, final) {
            widgetService.sortWidget(model.pageId, initial, final);
        }

        function trustHtmlContent(html) {
            return $sce.trustAsHtml(html);
        }

        function trustUrlResource(url) {
            var youtubeUrl = 'https://www.youtube.com/embed/';
            var urlParts =  url.split("/");
            youtubeUrl += urlParts[urlParts.length-1];
            return $sce.trustAsResourceUrl(youtubeUrl);

        }
        
        function getWidgetIncludeUrl(widgetType) {
            return "views/widget/templates/widgets/widget-"+ widgetType+".view.client.html";
        }
    }

})();