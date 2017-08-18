(function () {
    angular
        .module("WamApp")
        .controller("flickrController", flickrController)

    function flickrController($routeParams,flickrService, widgetService,$location) {
        var model = this;
        var tempWidget = null;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function init() {



            widgetService.findWidgetById(model.userId, model.websiteId, model.pageId, model.widgetId)
                .then(function (widget) {
                    tempWidget = widget;
                })

        }

        init();


        function searchPhotos(searchTerm) {
            console.log(searchTerm);

            flickrService
                .searchPhotos(searchTerm)
                .then(function (response) {
                    console.log(response.data)
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {

            var photo = photo;


            tempWidget.url = "https://farm" + photo.farm + ".staticflickr.com/"+ photo.server + "/" + photo.id+ "_" + photo.secret + "_m.jpg";
            widgetService.updateWidget(model.userId, model.websiteId, model.pageId, model.widgetId,tempWidget)
                .then(function () {
                    $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/" + model.widgetId);
                })
        }



}

})();
