/**
 * Created by Zion on 6/28/17.
 */
(function () {
    angular
        .module("WAM")
        .controller("FooterController", footerController);
    function footerController($routeParams) {

        var footerCtrl = this;

        footerCtrl.userId = $routeParams.userId;


    }
})();