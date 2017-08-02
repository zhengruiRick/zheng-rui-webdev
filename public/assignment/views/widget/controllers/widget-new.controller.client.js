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
            widgetService.findWidgetByPageId(model.userId, model.websiteId, model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
            widgetService.findWidgetById(model.userId, model.websiteId, model.pageId, model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                })

        }
        init();

        function getRightNewWidgetTypeUrl() {
            return "views/widget/templates/editors/widget-"+ model.widgetType + "-edit.view.client.html"

        }

        function createWidget(widget, type) {
            var page = widgetService.createWidget(model.userId, model.websiteId, model.pageId,widget,type)
                .then(function () {
                    $location.url("user/"+ model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
                })

        }





}

})();