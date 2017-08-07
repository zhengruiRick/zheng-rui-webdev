(function () {
    angular
        .module("myDirectives", [])
        .directive("itemList", itemListDirective)
        .directive("hello", helloDirective);


    function helloDirective() {
        return {
            template:"Hello World"
        }
    }

    function itemListDirective($http) {
        return {
            templateUrl: "widget-list.html",
            link: linkFunction
        }
    }

    function linkFunction(scope, element) {
        var ul = element.find("ul");

        var startIndex = -1;
        var endIndex = -1;

        ul.sortable({



            start: function (event, ui) {
                startIndex= $(ui.item).index();
            },
            stop: function (event, ui) {
                endIndex = $(ui.item).index();
                console.log([startIndex,endIndex]);
                $http.put("/api/page/123?start="+ startIndex+"&end="+endIndex );
            }
        });
    }


})();