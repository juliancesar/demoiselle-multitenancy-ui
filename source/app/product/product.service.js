angular.module('dml')
    .service('ProductService', function ($http, ConfigurationService, TenantService) {

        var services = [];
        
        services.create = function(product) {            
            var tenant = ConfigurationService.getTenant();
            
            return $http({
                method: 'POST',
                url: TenantService.getUrlForTenantType('product') + tenant.name + '/products',
                data: product                
            });
        };

        services.remove = function(product) {
            var tenant = ConfigurationService.getTenant();
            
            var urlDelete = TenantService.getUrlForTenantType('product') + tenant.name + '/products/' + product.id;
            return $http({
                url: urlDelete, 
                method: 'DELETE'               
            })
        };
        
        services.list = function () {
            var tenant = ConfigurationService.getTenant();
            
            return $http.get(TenantService.getUrlForTenantType('product') + tenant.name + '/products');
        };
        
        services.count = function () {
            var tenant = ConfigurationService.getTenant();
                        
            return $http.get(TenantService.getUrlForTenantType('product') + tenant.name + '/products/count');
        };

        return services;

    });