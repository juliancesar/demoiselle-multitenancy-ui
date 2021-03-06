angular.module('dml', ['ui.bootstrap', 'ui.router', 'ngStorage', 'angular-loading-bar', 'ui-notification', 'jsonFormatter'])

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $localStorageProvider, NotificationProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'app/home/home.html'
            })
            .state('server', {
                url: '/server',
                templateUrl: 'app/server/server.html',
                controller: 'ServerController'
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
            })
             .state('product', {
                url: '/product',
                templateUrl: 'app/product/product.html',
                controller: 'ProductController'
            })
            .state('security', {
                url: '/security',
                templateUrl: 'app/security/security.html',
                controller: 'SecurityController'
            });

        $urlRouterProvider.otherwise('/home');

        $localStorageProvider.setKeyPrefix('dml_');

        NotificationProvider.setOptions({
            delay: 5000,
            startTop: 10,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'bottom'
        });

        // Interceptor
        $httpProvider.interceptors.push('HttpInterceptorService');

    })

    .run(function ($location, Notification, ConfigurationService, $rootScope, $urlRouter, $state) {

        $rootScope.connectionError = false;

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {

            // Verifica se existe URL
            var serverUrl = ConfigurationService.getServerUrl();
            if ((toState.url != '/server' && toState.url != '/home') && (serverUrl == undefined || serverUrl == '')) {
                event.preventDefault();
                $state.go('server');
            } else {

                // Verifica se existe um TENANT
                var tenant = ConfigurationService.getTenant();
                if ((toState.url != '/server' && toState.url != '/home' && toState.url != '/tenant') && (tenant == undefined || tenant == "")) {
                    event.preventDefault();
                    Notification.error({ message: 'Selecione um Tenant' });
                    $state.go("tenant");
                }

            }

        });

    });