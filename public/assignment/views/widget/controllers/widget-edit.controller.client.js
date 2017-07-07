(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams,
                                $location,
                                widgetService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;
        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;
        model.uploadImage = uploadImage;
        // model.FlickrSearch = FlickrSearch;

        function init() {

            widgetService.findWidgetById(model.widgetId)
                .then(renderWidget, widgetError);
        }
        init();

        function renderWidget(widget) {
            model.currentWidget = widget;
        }

        function widgetError() {
            model.error = "Widget cannot be displayed. Please try again later";
        }

        function uploadImage() {
            var img = document.getElementById('upload').files[0];
            var form = new FormData();
            form.append('uploadFile', img);
            widgetService.uploadImage(form)
                .then(
                    function (text) {
                        model.currWidget.url = text;
                        model.message = "Upload Successful!";
                        document.getElementById('upload').value = null;
                    },
                    function () {
                        model.error = "Upload Failed. Please try again later";
                    });

        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId)
                .then(
                    function () {
                        $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                    }, widgetError);
        }

        function updateWidget() {
            widgetService.updateWidget(model.widgetId, model.widget).then(
                function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                }, widgetError);
        }

        // function FlickrSearch(event) {
        //     $fdialog.show({
        //         controller: 'FlickrSearchController',
        //         controllerAs: 'model',
        //         templateUrl: 'views/widget/templates/widget-flickr.view.client.html',
        //         parent: angular.element(document.body),
        //         targetEvent: event,
        //         clickOutsideToClose:true
        //     })
        //         .then(function(url) {
        //             model.curWidget.url = url;
        //         });
        // }
    }
})();