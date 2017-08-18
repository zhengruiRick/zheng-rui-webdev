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

                        websiteService.findWebsiteById(model.userId, model.websiteId)
                            .then(function (website) {
                                model.website = website;
                            })
                        websiteService.findWebsitesByUser(model.userId)
                            .then(function (websites) {
                                model.websites = websites;
                            })


                    }
                    init();

                    function deleteWebsite() {
                        websiteService
                            .deleteWebsite(model.userId, model.websiteId)
                            .then(function () {
                                $location.url("/user/"+model.userId+"/website");
                            })


                    }

                    function updateWebsite(website) {
                        websiteService
                            .updateWebsite(model.userId,model.websiteId, website)
                            .then(function () {
                                model.updateMessage= "Website update successfully";
                            })

                    }




                }


})();