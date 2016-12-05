angular.module('dml')
    .factory('HttpInterceptorService', function ($q, $rootScope) {

        var interceptor = {
            'response': function (response) {
                $rootScope.connectionError = false;
                return response;
            },
            'responseError': function (rejection) {

                if (rejection.status == -1) {
                    $rootScope.connectionError = true;

                    // Avisa que o tenant deu problema! Pode ter sideo deletado!
                    $rootScope.$broadcast('change-tenant', null);
                }

                return $q.reject(rejection);
            }
        };

        return interceptor;

    });