angular.module('dml')
    .factory('HttpInterceptorService', function ($q, $rootScope) {

        var interceptor = {
            'response' : function (response) {
                 $rootScope.connectionError = false;                 
                 return response;
            },
            'responseError': function (rejection) {

                if (rejection.status == -1) {
                    $rootScope.connectionError = true;
                }

                return $q.reject(rejection);
            }
        };

        return interceptor;

    });