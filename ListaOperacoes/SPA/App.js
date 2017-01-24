(function () {

    'use strict';

    angular
        .module('App', ['ui.router', 'ngNotificationsBar'])
        .config(configure);

    configure.$inject = ['$urlRouterProvider', '$stateProvider', 'notificationsConfigProvider'];

    function configure($urlRouterProvider, $stateProvider, notificationsConfigProvider) {
        $urlRouterProvider.otherwise('/Home');

        $stateProvider
            .state('Home', {
                url: '/Home',
                templateUrl: 'SPA/Views/Home.html',
                controller: 'HomeController'
            })
            .state('Sobre', {
                url: '/Sobre',
                templateUrl: 'SPA/Views/Sobre.html'
            });

        // Configurações da Notification Bar
        notificationsConfigProvider.setAutoHide(true);
        notificationsConfigProvider.setHideDelay(3000);
        notificationsConfigProvider.setAutoHideAnimation('fadeOutNotifications');
        notificationsConfigProvider.setAutoHideAnimationDelay(3000);
    };

})();