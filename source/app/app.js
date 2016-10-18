angular.module('dml', ['ui.bootstrap', 'ui.router'])

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

        // $httpProvider.interceptors.push('HttpInterceptor');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'app/home/home.html'
            })
            .state('tenants', {
                url: '/tenants',
                templateUrl: 'app/tenants/tenants.html',
                controller: 'TenantsController'
            });
            
        $urlRouterProvider.otherwise('/home');

    });