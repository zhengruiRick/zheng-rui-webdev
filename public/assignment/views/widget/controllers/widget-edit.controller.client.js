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

        model.getRightWidgetTypeUrl = getRightWidgetTypeUrl;
        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;




        function init() {
            model.widgets = widgetService.findWidgetByPageId(model.pageId);
            model.widget =widgetService.findWidgetById(model.widgetId);

        }
        init();

        function getRightWidgetTypeUrl(widgetType) {
            return "views/widget/templates/editors/widget-"+ widgetType + "-edit.view.client.html"

        }

        function deleteWidget(widgetId) {
            widgetService.deleteWidget(widgetId);
            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
        }

        function updateWidget(widget) {
            widgetService.updateWidget(model.widgetId, widget);
            model.updateMessage= "Website update successfully";
    }




}

})();