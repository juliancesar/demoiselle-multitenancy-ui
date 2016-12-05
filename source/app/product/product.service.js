angular.module('dml')
    .service('ProductService', function ($http, ConfigurationService, TenantService) {

        var services = [];

        console.log(TenantService.getUrlForTenantType('product'));

        services.create = function(product) {            
            var tenant = ConfigurationService.getTenant();
            
            return $http({
                method: 'POST',
                url: TenantService.getUrlForTenantType('product') + tenant.name + '/product',
                data: product                
            });
        };

        services.remove = function(product) {
            var tenant = ConfigurationService.getTenant();
            
            var urlDelete = ConfigurationService.getApiUrl() + tenant.name + '/product/' + product.id;
            return $http({
                url: urlDelete, 
                method: 'DELETE'               
            })
        };
        
        services.list = function () {
            var tenant = ConfigurationService.getTenant();
            
            return $http.get(TenantService.getUrlForTenantType('product') + tenant.name + '/product');
        };
        
        services.count = function () {
            var tenant = ConfigurationService.getTenant();
                        
            return $http.get(TenantService.getUrlForTenantType('product') + tenant.name + '/product/count');
        };

        return services;

    });