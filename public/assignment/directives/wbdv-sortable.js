(function() {
    angular
        .module('wbdvDirectives', [])
        .directive('wbdvSortable', wbdvSortable);

    function wbdvSortable() {

        function SortableLink(scope, element) {
            var initial = -1;
            var final = -1;

            $(element).sortable({
                axis: 'y',
                start: function(event, ui) {
                    inital = ui.item.index();
                },
                stop: function(event, ui) {
                    final = ui.item.index();
                    scope.wbdvSortCall(inital, final);

                }
            });
        }

        return {
            link: SortableLink
        }

    }

})();
