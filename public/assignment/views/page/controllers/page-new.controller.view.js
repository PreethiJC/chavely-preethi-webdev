(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams,
                                  $location,
                                  pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.createPage = createPage;

        function init() {
            pageService.findPageByWebsiteId(model.websiteId)
                .then(
                    function (pages) {
                        model.pages = pages;
                    },
                    function() {
                        model.error = "Page cannot be displayed. Please try again later."
                    });
        }
        init();

        function createPage(page) {
            pageService.createPage(model.websiteId, model.newPage)
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