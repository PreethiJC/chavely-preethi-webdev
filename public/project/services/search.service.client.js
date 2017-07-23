/**
 * Created by Zion on 7/21/17.
 */

(function() {
    angular
        .module('WAM')
        .factory('searchService', searchService);
    function searchService($http) {
        var api = {
            searchBook: searchBook,
            searchBookByID: searchBookByID
        };
        return api;
        function searchBook(title) {
            var url = "/api/project/books/"+title;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function searchBookByID(id) {
            var url = "https://www.goodreads.com/book/show/" + id + ".xml?key=T3XmyOG438rZNaDB6kTcHQ";
            return $http.get(url)
                .then(function (response) {
                    console.log(response)
                });
        }
    }

})();
