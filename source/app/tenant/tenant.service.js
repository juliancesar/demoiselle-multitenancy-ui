angular.module('dml')
    .service('TenantService', function($http, ConfigurationService) {

        var tenantTypes = [
            { "name": "user" },
            { "name": "product" },
            // { "name": "sale" }
        ];

        var apiDefaultPrefix = 'api';

        var services = [];

        services.getTypes = function() {
            return tenantTypes;
        };

        services.getApiDefaultPrefix = function() {
            return apiDefaultPrefix;
        };

        services.getApiUrlToTenantTypes = function() {
            var ar = [];
            angular.forEach(tenantTypes, function(value, key) {
                this.push(ConfigurationService.getServerUrl() + value.name + "/" + apiDefaultPrefix + "/");
            }, ar);
            return ar;
        };

        services.create = function(tenant) {
            return $http({
                method: 'POST',
                url: ConfigurationService.getApiUrl() + 'tenant',
                data: tenant
            });
        };

        services.remove = function(tenant) {
            var urlDelete = ConfigurationService.getApiUrl() + 'tenant/' + tenant.id;
            return $http({
                url: urlDelete,
                method: 'DELETE'
            })
        };

        services.list = function() {
            return $http.get(ConfigurationService.getApiUrl() + 'tenant');
        };

        return services;

    });