// https://github.com/alexcrack/angular-ui-notification
angular.module('dml', ['ui.bootstrap', 'ui.router', 'ngStorage', 'angular-loading-bar', 'ui-notification'])

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $localStorageProvider, NotificationProvider) {

        // $httpProvider.interceptors.push('HttpInterceptor');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'app/home/home.html'
            })
            .state('tenant', {
                url: '/tenant',
                templateUrl: 'app/tenant/tenant.html',
                controller: 'TenantController'
            })
            .state('user', {
                url: '/user',
                templateUrl: 'app/user/user.html',
                controller: 'UserController'
            });

        $urlRouterProvider.otherwise('/home');

        $localStorageProvider.setKeyPrefix('dml_');
        
        NotificationProvider.setOptions({
            delay: 5000,
            startTop: 10,
            startRight: 0,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'center',
            positionY: 'top'
        });

    });