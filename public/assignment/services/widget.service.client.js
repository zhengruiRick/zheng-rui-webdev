(function () {
    angular
        .module("WamApp")
        .factory("widgetService", widgetService);

    function widgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];



        var api = {
            "findWidgetByPageId": findWidgetByPageId,
            "findWidgetById": findWidgetById,
            "deleteWidget": deleteWidget,
            "updateWidget": updateWidget,
            "createWidget": createWidget
        };
        return api;

        function findWidgetById(widgetId) {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    return widgets[w];
                }
            }
            return null;

        }

        function findWidgetByPageId(pageId) {
            var _widgets =[];

            for (var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    _widgets.push(widgets[w]);
                }
            }
            return _widgets;
        }

        function deleteWidget(widgetId) {
            var widget = findWidgetById(widgetId);
            var index = widgets.indexOf(widget);
            widgets.splice(index,1);

        }

        function updateWidget(widgetId, widget) {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    widgets[w] = widget;
                    return;
                }
            }
            return null;
        }

        function createWidget(pageId, widget, type) {

            widget._id =  (new Date()).getTime() + "456";
            widget.pageId = pageId;
            widget.widgetType = type;
            widgets.push(widget);
            return widget;



        }




    }

    function init() {

    }
    init();

})();