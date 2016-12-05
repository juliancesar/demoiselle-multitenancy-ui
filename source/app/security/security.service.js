angular.module('dml')
    .service('SecurityService', function ($http, ConfigurationService, TenantService) {

        var services = [];

        services.login = function (username, password) {
            var tenant = ConfigurationService.getTenant();

            return $http({
                method: 'POST',
                url: TenantService.getUrlForTenantType('user') + tenant.name + '/auth/login',
                data: {
                    "username": username,
                    "password": password
                }
            });
        };

        return services;

    });