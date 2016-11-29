angular.module('dml')
    .service('UserService', function ($http, ConfigurationService) {

        var services = [];

        services.create = function(user) {            
            var tenant = ConfigurationService.getTenant();
            
            return $http({
                method: 'POST',
                url: ConfigurationService.getApiUrl() + tenant.name + '/user',
                data: user                
            });
        };

        services.remove = function(user) {
            var tenant = ConfigurationService.getTenant();
            
            var urlDelete = ConfigurationService.getApiUrl() + tenant.name + '/user/' + user.id;
            return $http({
                url: urlDelete, 
                method: 'DELETE'               
            })
        };
        
        services.list = function () {
            var tenant = ConfigurationService.getTenant();
            
            return $http.get(ConfigurationService.getApiUrl() + tenant.name + '/user');
        };
        
        services.count = function () {
            var tenant = ConfigurationService.getTenant();
                        
            return $http.get(ConfigurationService.getApiUrl() + tenant.name + '/user/count');
        };

        return services;

    });