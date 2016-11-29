angular.module('dml')
    .service('SecurityService', function ($http, ConfigurationService) {

        var services = [];

        services.login = function (username, password) {
            var tenant = ConfigurationService.getTenant();

            return $http({
                method: 'POST',
                url: ConfigurationService.getApiUrl() + tenant.name + '/auth/login',
                data: {
                    "username": username,
                    "password": password
                }
            });
        };

        return services;

    });