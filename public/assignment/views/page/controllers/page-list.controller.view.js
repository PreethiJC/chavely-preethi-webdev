(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);

    function pageListController($routeParams,
                                   pageService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

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
    }
})();