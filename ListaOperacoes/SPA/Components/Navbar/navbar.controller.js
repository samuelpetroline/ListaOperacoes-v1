(function () {

    angular
        .module('App')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', '$state', '$location'];

    function NavbarController($scope, $state, $location) {
 
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

    };


})();