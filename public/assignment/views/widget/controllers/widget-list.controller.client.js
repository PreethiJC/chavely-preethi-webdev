(function () {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);

    function widgetListController($routeParams,$sce, widgetService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetUrl = widgetUrl;

        function init() {
            widgetService.findAllWidgetsForPage(model.pageId)
                .then(renderWidgets, widgetError);
        }

        init();

        function renderWidgets(widgets) {
            model.widgets = widgets;
        }

        function widgetError() {
            widgetCtrl.error = "Widget cannot be displayed. Please try again later";
        }

        function widgetUrl(widget) {
            var url = 'views/widget/templates/widget-' + widget.widgetType.toLowerCase() + '.view.client.html';
            return url;
        }

        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trust(html) {
            // scrubbing the html
            return $sce.trustAsHtml(html);
        }
    }
})();
