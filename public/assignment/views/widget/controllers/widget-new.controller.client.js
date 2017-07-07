
(function () {
    angular
        .module("WAM")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams,
                                 $location,
                                 widgetService, $fDialog) {

        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetType = $routeParams.widgetType;
        model.createWidget = createWidget;
        model.deleteWidget = deleteWidget;
        model.uploadImage = uploadImage;
        model.FlickrSearch = FlickrSearch;

        function uploadImage() {
            var img = document.getElementById('upload').files[0];
            var form = new FormData();
            form.append('uploadFile', img);
            widgetService.uploadImage(form)
                .then(
                    function (text) {
                        model.currentWidget.url = text;
                        model.message = "Upload Successful!";
                        document.getElementById('upload').value = null;
                    },
                    function () {
                        model.error = "Upload Failed. Please try again later";
                    });

        }

        function init() {
            widgetService.findAllWidgetsForPage(model.pageId)
                .then(renderWidgets, widgetError);
        }
        init();

        function renderWidgets(widgets) {
            model.widgets = widgets;
        }

        function widgetError() {
            model.error = "Widget cannot be displayed. Please try again later";
        }

        function createWidget() {
            model.currentWidget.widgetType = model.widgetType;
            widgetService.createWidget(model.pageId, model.currentWidget)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                }, widgetError);

        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId)
                .then(
                    function () {
                        $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                    }, widgetError);
        }

        function FlickrSearch(event) {
            $fdialog.show({
                controller: 'FlickrSearchController',
                controllerAs: 'model',
                templateUrl: 'views/widget/templates/widget-flickr.view.client.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose:true
            })
                .then(function(url) {
                    model.curWidget.url = url;
                });
        }
    }
})();