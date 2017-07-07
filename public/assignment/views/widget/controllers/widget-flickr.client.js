(function () {
    angular
        .module("WAM")
        .controller("FlickrSearchController", FlickrSearchController);

    function FlickrSearchController($scope, FlickrService) {
        var model = this;
        this.searchPhotos = searchPhotos;
        this.choosePhoto = choosePhoto;

        function searchPhotos(query) {
            FlickrService
                .searchPhotos(query)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            $fDialog.hide(url);

        }
    }
})();
