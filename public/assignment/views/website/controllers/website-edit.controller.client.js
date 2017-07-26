(function () {

                angular
                    .module("WamApp")
                    .controller("websiteEditController", websiteEditController);



                function websiteEditController($routeParams,$location, websiteService) {
                    var model = this;

                    model.userId = $routeParams['userId'];
                    model.websiteId = $routeParams['websiteId'];

                    model.deleteWebsite = deleteWebsite;
                    model.updateWebsite = updateWebsite;



                    function init() {

                        model.website = websiteService.findWebsiteById(model.websiteId);
                        model.websites = websiteService.findWebsitesByUser(model.userId);


                    }
                    init();

                    function deleteWebsite(websiteId) {
                        websiteService.deleteWebsite(websiteId);
                        $location.url("/user/"+model.userId+"/website");

        }

        function updateWebsite(website) {
            websiteService.updateWebsite(model.websiteId, website);
            model.updateMessage= "Website update successfully";
        }


    }


})();