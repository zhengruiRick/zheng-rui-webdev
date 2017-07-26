(function () {
    angular
        .module("WamApp")
        .controller("widgetNewController", widgetNewController);


    function widgetNewController($routeParams,widgetService,$location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;
        model.widgetType = $routeParams.widgetType;

        model.getRightNewWidgetTypeUrl = getRightNewWidgetTypeUrl;
        model.createWidget = createWidget;





        function init() {
            model.widgets = widgetService.findWidgetByPageId(model.pageId);
            model.widget =widgetService.findWidgetById(model.widgetId);

        }
        init();

        function getRightNewWidgetTypeUrl() {
            return "views/widget/templates/editors/widget-"+ model.widgetType + "-edit.view.client.html"

        }

        function createWidget(widget, type) {
            var page = widgetService.createWidget(model.pageId,widget,type);
            $location.url("user/"+ model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
        }





}

})();