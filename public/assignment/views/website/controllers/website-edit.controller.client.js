(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams,
                                   $location,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;



        function init() {
            websiteService.findWebsiteByUser(model.userId)
                .then(renderWebsites, websiteError);
            websiteService.findWebsiteById(model.websiteId)
                .then(renderWebsite, websiteError);
        }
        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function renderWebsite(website) {
            model.currWebsite = website;
        }

        function websiteError() {
            model.error = "Page cannot be displayed. Please try again later!";
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(model.websiteId)
                .then(
                    function () {
                        $location.url('/user/' + model.userId + "/website");
                    }, websiteError);
        }

        function updateWebsite(website) {
            websiteService.updateWebsite(model.websiteId, model.currentWebsite)
                .then(
                    function () {
                        $location.url('/user/' + model.userId + "/website");
                    }, websiteError);
        }
    }
})();