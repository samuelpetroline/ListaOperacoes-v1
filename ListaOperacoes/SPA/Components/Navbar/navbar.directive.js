(function () {

    angular
        .module('App')
        .directive('homeNavbar', homeNavbar);

    function homeNavbar() {
        return {
            link: link,
            restrict: 'EA',
            templateUrl: 'SPA/Components/Navbar/navbar.html',
            controller: 'NavbarController'
        };

        function link(scope, element, attrs) {

        }
    };


})();