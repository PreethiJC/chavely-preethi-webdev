
(function () {
    angular
        .module("WAM")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams,
                                 $location,
                                 widgetService) {

        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetType = $routeParams.widgetType;
        model.createNewWidget = createNewWidget;
        model.deleteWidget = deleteWidget;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
        }
        init();

        function createNewWidget() {
            model.currentWidget.widgetType = model.widgetType;
            widgetService.createWidget(model.pageId, model.currentWidget);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');

        }

        function deleteWidget() {
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
        }


    }
})();