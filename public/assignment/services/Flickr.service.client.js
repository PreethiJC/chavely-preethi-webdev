/**
 * Created by Zion on 7/7/17.
 */
(function () {
    angular
        .module("WAM")
        .service('FlickrService', FlickrService);

    function FlickrService($http) {

        this.searchPhotos = searchPhotos;
        var key = "0e91edfc3e84bb3ecdafc3a479e10403";
        var secret = "1c08e6912a2671d9";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }


    }


})();