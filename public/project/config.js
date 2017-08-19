(function () {

    angular
        .module("LoanerApp")
        .config(configuration);



    function configuration($routeProvider, $httpProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

        $routeProvider


            .when("/",{
                templateUrl: "views/home/home.view.client.html",
                controller: "homeController",
                controllerAs: "model"
            })

            .when("/user/:userId",{
                templateUrl: "views/home/home.view.client.html",
                controller: "homeController",
                controllerAs: "model"
            })


            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"

            })
            .when("/admin/registerUser", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })

            .when("/admin/:userId", {
                templateUrl: "views/user/templates/adminView.view.client.html",
                controller: "adminViewController",
                controllerAs: "model"
            })
            .when("/admin", {
                templateUrl: "views/user/templates/adminView.view.client.html",
                controller: "adminViewController",
                controllerAs: "model"
            })
            .when("/admin/:adminId/create", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })

            .when("/admin/:adminId/userProfile/:userId", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })

            .when("/changPassword/:userId", {
                templateUrl: "views/user/templates/changePassword.view.client.html",
                controller: "changePasswordController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })

            // .when("/AllAvailableList", {
            //     templateUrl: "views/equipment/templates/AllAvailableList.view.client.html",
            //     controller: "availableEquipmentListController",
            //     controllerAs: "model"
            // })

            .when("/availableEquipmentList/:userId", {
                templateUrl: "views/equipment/templates/availableEquipmentList.view.client.html",
                controller: "availableEquipmentListController",
                controllerAs: "model"
            })

            .when("/user/:userId/equipment/:equipmentId", {
                templateUrl: "views/equipment/templates/equipmentDetail.view.client.html",
                controller: "equipmentDetailController",
                controllerAs: "model"
            })

            .when("/admin/:adminId/equipmentProfile/:equipmentId", {
                templateUrl: "views/equipment/templates/equipmentEdit.view.client.html",
                controller: "equipmentEditController",
                controllerAs: "model"
            })
            .when("/admin/:adminId/equipment/new", {
                templateUrl: "views/equipment/templates/equipmentNew.view.client.html",
                controller: "equipmentNewController",
                controllerAs: "model"
            })








        //
        //
        //
        // //website routes
        //
        //     .when("/user/:userId/website", {
        //         templateUrl: "views/website/templates/website-list.view.client.html",
        //         controller: "websiteListController",
        //         controllerAs: "model"
        //     })
        //
        //     .when("/user/:userId/website/new", {
        //         templateUrl: "views/website/templates/website-new.view.client.html",
        //         controller: "websiteNewController",
        //         controllerAs: "model"
        //     })
        //
        //     .when("/user/:userId/website/:websiteId", {
        //         templateUrl: "views/website/templates/website-edit.view.client.html",
        //         controller: "websiteEditController",
        //         controllerAs: "model"
        //     })
        //  //page routes
        //
        //     .when("/user/:userId/website/:websiteId/page", {
        //         templateUrl: "views/page/templates/page-list.view.client.html",
        //         controller: "pageListController",
        //         controllerAs: "model"
        //     })
        //
        //     .when("/user/:userId/website/:websiteId/page/new", {
        //         templateUrl: "views/page/templates/page-new.view.client.html",
        //         controller: "pageNewController",
        //         controllerAs: "model"
        //     })
        //
        //     .when("/user/:userId/website/:websiteId/page/:pageId", {
        //         templateUrl: "views/page/templates/page-edit.view.client.html",
        //         controller: "pageEditController",
        //         controllerAs: "model"
        //     })
        //
        // // widget routes
        //     .when("/user/:userId/website/:websiteId/page/:pageId/widget", {
        //         templateUrl: "views/widget/templates/widget-list.view.client.html",
        //         controller: "widgetListController",
        //         controllerAs: "model"
        //     })
        //
        //     .when("/user/:userId/website/:websiteId/page/:pageId/widget/new/", {
        //         templateUrl: "views/widget/templates/widget-chooser.view.client.html",
        //         controller: "widgetNewController",
        //         controllerAs: "model"
        //     })
        //
        //
        //
        //
        //     .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", {
        //         templateUrl: "views/widget/templates/widget-edit.view.client.html",
        //         controller: "widgetEditController",
        //         controllerAs: "model"
        //     })
        //
        //     .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/search", {
        //         templateUrl: "views/widget/templates/widget-flickr-search.view.client.html",
        //         controller: "flickrController",
        //         controllerAs: "model"
        //
        //     })

    }

    function checkLogin( userService, $q) {
        var deferred =  $q.defer();
        userService.checkLogin()
            .then(function (user) {
                if (user ==="0") {
                    deferred.reject();


                } else {
                    deferred.resolve(user);

                }

            });
        return deferred.promise;

    }


})();

