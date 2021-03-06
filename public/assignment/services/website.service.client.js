(function () {
    angular
        .module('WAM')
        .service('websiteService', websiteService);

    function websiteService($http) {
        this.findAllWebsitesForUser = findAllWebsitesForUser;
        this.findWebsiteById = findWebsiteById;
        this.deleteWebsite = deleteWebsite;
        this.createWebsite = createWebsite;
        this.updateWebsite = updateWebsite;

        var userURL = '/api/assignment/user';
        var websiteURL = '/api/assignment/website';

        function createWebsite(userId, website) {
            var url = userURL + '/' + userId + '/website';
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                });

        }

        function deleteWebsite(websiteId) {
            var url = websiteURL + '/' + websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWebsiteById(websiteId) {
            var url = websiteURL + '/' + websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllWebsitesForUser(userId) {
            var url = userURL + '/' + userId + '/website';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWebsite(websiteId, website) {
            var url = websiteURL + '/' + websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();