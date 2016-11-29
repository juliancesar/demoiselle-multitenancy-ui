angular.module('dml')
    .service('TenantService', function ($http, ConfigurationService) {

        var services = [];

        services.create = function (tenant) {
            return $http({
                method: 'POST',
                url: ConfigurationService.getApiUrl() + 'tenant',
                data: tenant
            });
        };

        services.remove = function (tenant) {
            var urlDelete = ConfigurationService.getApiUrl() + 'tenant/' + tenant.id;
            return $http({
                url: urlDelete,
                method: 'DELETE'
            })
        };

        services.list = function () {
            return $http.get(ConfigurationService.getApiUrl() + 'tenant');
        };

        return services;

    });