angular.module('dml')
    .factory('HttpInterceptorService', function ($q, $rootScope) {

        var interceptor = {
            'responseError': function (rejection) {

                if (rejection.status == -1) {
                    $rootScope.connectionError = true;
                } else {
                    $rootScope.connectionError = false;
                }

                return $q.reject(rejection);
            }
        };

        return interceptor;

    });