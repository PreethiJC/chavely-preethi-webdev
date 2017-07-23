/**
 * Created by Zion on 7/21/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('searchController', searchController);

    function searchController($location, searchService){
        var model = this;
        model.hello = 'Hello from SearchController';
        model.searchBook = searchBook;
        model.searchBookByID = searchBookByID;
        function searchBook(title) {
            searchService
                .searchBook(title)
                .then(function (result) {
                    console.log(result.GoodreadsResponse.search[0].results[0].work[0]);
                    model.books = result.GoodreadsResponse.search[0].results[0].work;
                })
        }

        function searchBookByID(id) {
            searchService
                .searchBookByID(id)
                .then(function (result) {
                    console.log(result);
                })
        }
    }
})();