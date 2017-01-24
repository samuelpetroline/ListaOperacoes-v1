(function () {

    'use strict';

    angular
        .module('App')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'ApiService'];

    function HomeController($scope, ApiService) {
        var vm = this;


    };

})();