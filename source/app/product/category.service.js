angular.module('dml')
    .service('CategoryService', function ($http, ConfigurationService, TenantService) {

        var services = [];

        services.create = function (category) {
            var tenant = ConfigurationService.getTenant();

            return $http({
                method: 'POST',
                url: TenantService.getUrlForTenantType('product') + tenant.name + '/categories',
                data: category
            });
        };

        services.remove = function (category) {
            var tenant = ConfigurationService.getTenant();
            var urlDelete = TenantService.getUrlForTenantType('product') + tenant.name + '/categories/' + category.id;
            return $http({
                url: urlDelete,
                method: 'DELETE'
            })
        };

        services.list = function () {
            var tenant = ConfigurationService.getTenant();
            return $http.get(TenantService.getUrlForTenantType('product') + tenant.name + '/categories');
        };

        services.count = function () {
            var tenant = ConfigurationService.getTenant();
            return $http.get(TenantService.getUrlForTenantType('product') + tenant.name + '/categories/count');
        };

        return services;

    });