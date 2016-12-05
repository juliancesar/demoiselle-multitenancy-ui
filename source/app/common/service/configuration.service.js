angular.module('dml')
    .service('ConfigurationService', function ($http, $localStorage) {

        var services = [];

        services.getServerUrl = function () {
            return $localStorage.serverUrl;
        };

        services.setServerUrl = function (url) {
            if (url.slice(-1) != '/')
                url = url + '/';
            $localStorage.serverUrl = url;
        };

        services.getTenant = function () {
            return $localStorage.tenant;
        };

        services.setTenant = function (tenant) {
            $localStorage.tenant = tenant;
        };


        return services;

    });