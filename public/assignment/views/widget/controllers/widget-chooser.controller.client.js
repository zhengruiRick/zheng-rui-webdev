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
            widgetService.findWidgetByPageId(model.userId, model.websiteId, model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                })

        }
        init();


    }

})();