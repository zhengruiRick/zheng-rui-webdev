(function () {
    angular
        .module("WamApp")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService, checkLogin) {
        var model = this;

        model.userId = checkLogin.id;//$routeParams.userId;


        function init() {
            websiteService
                .findWebsitesByUser(model.userId)
                .then(function (webstites) {
                    model.websites = webstites;

                });

        }
        init();


    }

})();