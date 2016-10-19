angular.module('dml')
    .service('ConfigurationService', function ($http, $localStorage) {

        var services = [];

        services.getApiUrl = function () {
            return $localStorage.apiUrl;
        };

        services.setApiUrl = function (url) {
            if (url.slice(-1) != '/')
                url = url + '/';
            $localStorage.apiUrl = url;
        };

        services.getTenant = function () {
            return $localStorage.tenant;
        };

        services.setTenant = function (tenant) {
            $localStorage.tenant = tenant;
        };


        return services;

    });