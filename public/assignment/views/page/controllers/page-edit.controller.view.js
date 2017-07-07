(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams,
                                   $location,
                                   pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.deletePage = deletePage;
        model.updatePage = updatePage;

        function init() {
            pageService.findPageByWebsiteId(model.websiteId)
                .then(
                    function (pages) {
                        model.pages = pages;
                    },
                    function() {
                        model.error = "Page cannot be displayed. Please try again later."
                    });
            pageService.findPageById(model.pageId)
                .then(
                    function (page) {
                        model.currPage = page;
                    },
                    function() {
                        model.error = "Page cannot be displayed. Please try again later."
                    });
        }
        init();

        function deletePage() {
            pageService.deletePage(model.pageId)
                .then(
                    function () {
                        $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                    },
                    function() {
                        model.error = "Page cannot be displayed. Please try again later."
                    });
        }

        function updatePage() {
            pageService.updatePage(model.pageId, model.currPage)
                .then(
                    function () {
                        $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                    },
                    function() {
                        model.error = "Page cannot be displayed. Please try again later."
                    });
        }
    }
})();