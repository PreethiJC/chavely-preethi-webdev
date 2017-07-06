/**
 * Created by Zion on 6/28/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('widgetChooseController', widgetChooseController);
    function widgetChooseController($routeParams, $location, widgetService) {

        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetTypeList = ['Header', 'Image', 'YouTube', 'HTML'];
        model.navigateNewWidget = navigateNewWidget;

        function navigateNewWidget(widgetType) {
            widgetType = widgetType.toUpperCase();
            if (widgetType === 'HEADER') {
                widgetType = 'HEADING';
            }
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widgetType + '/new');
        }


    }
})();