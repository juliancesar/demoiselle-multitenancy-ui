angular.module('dml')
    .factory('HttpInterceptorService', function ($q) {

        var interceptor = {
            'responseError': function (rejection) {
                // console.log(rejection);
                return $q.reject(rejection);
            }
        };

        return interceptor;

    });