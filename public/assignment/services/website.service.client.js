(function () {
    angular
        .module('WAM')
        .service('websiteService', websiteService);

    function websiteService() {
        this.findAllWebsitesForUser = findAllWebsitesForUser;
        this.findWebsiteById = findWebsiteById;
        this.deleteWebsite = deleteWebsite;
        this.createWebsite = createWebsite;
        this.updateWebsite = updateWebsite;

        

        function createWebsite(userId, website) {
            website._id = (new Date()).getTime() + "";
            website.developerId = userId;
            websites.push(website);

        }

        function deleteWebsite(websiteId) {
            var website = findWebsiteById(websiteId);
            var index = websites.indexOf(website);
            websites.splice(index, 1);
        }

        function findWebsiteById(websiteId) {
            return websites.find(function (website) {
                return website._id === websiteId;
            });
        }

        function findAllWebsitesForUser(userId) {
            var results = [];
            for(var v in websites) {
                if(websites[v].developerId === userId) {
                    websites[v].created = new Date();
                    websites[v].accessed = new Date();
                    results.push(websites[v]);
                }
            }
            return results;
        }

        function updateWebsite(websiteId, website) {
            var oldWebsite = findWebsiteById(websiteId);
            var index = websites.indexOf(oldWebsite);
            websites.splice(index, 1, website);
        }
    }
})();