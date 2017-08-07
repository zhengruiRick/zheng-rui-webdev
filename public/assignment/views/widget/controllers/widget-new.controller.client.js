(function () {
    angular
        .module("WamApp")
        .controller("widgetNewController", widgetNewController);


    function widgetNewController($routeParams,widgetService,$location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;


        model.createWidget = createWidget;



        function init() {


        }
        init();


        function createWidget(widgetType) {
            widgetService.createWidget(model.userId, model.websiteId, model.pageId,{widgetType: widgetType})
                .then(function (widget) {
                    if (widget) {
                        $location.url("user/"+ model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/"+widget._id);
                    }

                })

        }



}

})();