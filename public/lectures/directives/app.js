(function () {
    angular
        .module("directiveApp", ["myDirectives"])
        .controller("directiveController", directiveController);

    function directiveController($scope) {
        $scope.widgets = [
            {"type": "HEADING"},
            {"type": "IMAGE"},
            {"type": "YOUTUBE"},
            {"type": "HTML"}

            ]
    }

})();