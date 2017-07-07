(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams,
                                  $location,
                                  websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.createWebsite = createWebsite;

        function init() {
            websiteService.findWebsiteByUser(model.userId)
                .then(renderWebsites, websiteError);
        }

        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function websiteError() {
            model.error = "Page cannot be displayed. Please try again later!";
        }

        function createWebsite() {
            websiteService.createWebsite(model.userId, model.newWebsite)
                .then(function () {
                    $location.url('/user/' + model.userId + "/website");
                }, websiteError);
        }
    }
})();