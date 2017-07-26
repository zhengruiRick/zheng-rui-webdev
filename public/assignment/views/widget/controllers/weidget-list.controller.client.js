(function () {
    angular
        .module("WamApp")
        .controller("widgetListController", widgetListController);


    function widgetListController($sce) {
        var model = this;

        model.trustHtmlContent = trustHtmlContent;
        model.trustUrlResource = trustUrlResource;
        model.getWidgetIncludeUrl = getWidgetIncludeUrl;


        function init() {

            model.widgets = [
                { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ]

        }
        init();

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