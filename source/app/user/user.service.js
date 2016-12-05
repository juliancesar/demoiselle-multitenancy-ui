angular.module('dml')
    .service('UserService', function ($http, ConfigurationService, TenantService) {

        var services = [];

        console.log(TenantService.getUrlForTenantType('user'));

        services.create = function(user) {            
            var tenant = ConfigurationService.getTenant();
            
            return $http({
                method: 'POST',
                url: TenantService.getUrlForTenantType('user') + tenant.name + '/user',
                data: user                
            });
        };

        services.remove = function(user) {
            var tenant = ConfigurationService.getTenant();
            
            var urlDelete = TenantService.getUrlForTenantType('user') + tenant.name + '/user/' + user.id;
            return $http({
                url: urlDelete, 
                method: 'DELETE'               
            })
        };
        
        services.list = function () {
            var tenant = ConfigurationService.getTenant();
            
            return $http.get(TenantService.getUrlForTenantType('user') + tenant.name + '/user');
        };
        
        services.count = function () {
            var tenant = ConfigurationService.getTenant();
                        
            return $http.get(TenantService.getUrlForTenantType('user') + tenant.name + '/user/count');
        };

        return services;

    });