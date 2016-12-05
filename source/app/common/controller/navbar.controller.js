angular.module('dml')
    .controller('NavBarController', function ($scope, $localStorage, $location, ConfigurationService) {

        // Mostra o tenant atual
        $scope.selectedTenant = (ConfigurationService.getTenant() == undefined ? { id: 0, name: 'Nenhum Tenant Selecionado' } : ConfigurationService.getTenant());

        $scope.$on('change-tenant', function (event, tenant) {
            ConfigurationService.setTenant(tenant);
            $scope.selectedTenant = ConfigurationService.getTenant();
            
            // Se o tenant é null manda para o home
            if (tenant == null) {
                $location.path('/server')
            }
        });

        $scope.getClass = function (path) {
            return ($location.path().substr(0, path.length) === path) ? 'active' : '';
        };

    });