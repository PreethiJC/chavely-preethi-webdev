(function () {
    angular
        .module('WAM')
        .service('pageService', pageService);

    function pageService($http) {
        this.createPage = createPage;
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        var websiteURL = '/api/assignment/website';
        var pageURL = '/api/assignment/page';

        function createPage(websiteId, page) {
            var url = websiteURL + '/' + websiteId + '/page';
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePage(pageId) {
            var url = pageURL + '/' + pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageById(pageId) {
            var url = pageURL + '/' + pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageByWebsiteId(websiteId) {
            var url = websiteURL + '/' + websiteId + '/page';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePage(pageId, page) {
            var url = pageURL + '/' + pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();