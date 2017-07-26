(function () {
    angular
        .module("WamApp")
        .controller("widgetChooserController", widgetChooserController);

    function widgetChooserController($routeParams, widgetService,$location) {
        var model = this;


        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;






        function init() {
            model.widgets = widgetService.findWidgetByPageId(model.pageId);

        }
        init();


    }

})();