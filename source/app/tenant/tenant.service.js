angular.module('dml')
    .service('TenantService', function($http, ConfigurationService) {

        var tenantTypes = [
            { "name": "user", "apiUrl": "users/api/v1/" },
            { "name": "product", "apiUrl": "products/api/v1/" },
            // { "name": "sale", "apiUrl" : "sale/api/" }
        ];

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
                this.push(ConfigurationService.getServerUrl() + value.apiUrl);
            }, ar);
            return ar;
        };

        services.getUrlForTenantType = function(t) {
            for (i in tenantTypes) {
                if (tenantTypes[i].name == t)
                    return ConfigurationService.getServerUrl() + tenantTypes[i].apiUrl;
            }
            return null;
        };

        services.create = function(tenant) {
            // Tem que criar em todas as URLs
            var urlsApi = services.getApiUrlToTenantTypes();
            var promisses = [];

            for (i in urlsApi) {
                promisses.push($http({
                    method: 'POST',
                    url: urlsApi[i] + 'tenant',
                    data: tenant
                }));
            }

            return promisses;
        };

        services.remove = function(tenant) {
            // Tem que criar em todas as URLs
            var urlsApi = services.getApiUrlToTenantTypes();
            var promisses = [];

            for (i in urlsApi) {
                var urlDelete = urlsApi[i] + 'tenant/' + tenant.id;
                promisses.push($http({
                    url: urlDelete,
                    method: 'DELETE'
                }));
            }

            return promisses;
        };

        services.list = function() {
            var urls = services.getApiUrlToTenantTypes();
            return $http.get(urls[0] + 'tenant');
        };

        return services;

    });