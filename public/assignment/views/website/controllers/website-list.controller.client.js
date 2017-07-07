(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];

        function init() {
            console.log()
            websiteService.findAllWebsitesForUser(model.userId)
                .then(renderWebsites, websiteError);
        }

        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function websiteError() {
            model.error = "Page cannot be displayed. Please try again later!";
        }
    }
})();