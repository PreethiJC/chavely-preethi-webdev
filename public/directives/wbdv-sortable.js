/**
 * Created by Zion on 7/19/17.
 */
(function () {
    angular
        .module("WAM")
        .directive('wbdvSortable', sortableWidget);

    function sortableWidget($http, $anchorScroll) {
        return {
            link: linkFunction
        };

        function linkFunction(scope, element, attrs) {
            $(element).sortable({
                handle: '.handle',
                start: function (event, ui) {
                    scope.error = null;
                    ui.item.startPos = ui.item.index();
                },
                update: function (event, ui) {
                    initial = ui.item.startPos;
                    final = ui.item.index();
                    pageId = attrs.pageId;
                    url = '/api/assignment5/page/' + pageId + '/widget?initial=' + initial + '&final=' + final;
                    $http.put(url)
                        .then(function () {
                        }, function () {
                            scope.error = "Sorry, we were not able to update your latest changes. Please try later!";
                            $(element).sortable('cancel');
                            $anchorScroll('top');
                        })

                }
            });
        }

    }
})();