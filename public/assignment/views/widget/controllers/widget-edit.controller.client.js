(function () {
    angular
        .module("WamApp")
        .controller("widgetEditController", widgetEditController);


    function widgetEditController($routeParams,widgetService,$location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;


        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;




        function init() {
            widgetService.findWidgetByPageId(model.userId, model.websiteId, model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                })
            widgetService.findWidgetById(model.userId, model.websiteId, model.pageId,model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                })

        }
        init();


        function deleteWidget(widgetId) {
            widgetService.deleteWidget(model.userId, model.websiteId, model.pageId, widgetId)
                .then(function () {
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
                })

        }

        function updateWidget(widget) {
            widgetService.updateWidget(model.userId, model.websiteId, model.pageId,model.widgetId, widget)
                .then(function () {
                    model.updateMessage= "Website update successfully";
                })

        }



}

})();