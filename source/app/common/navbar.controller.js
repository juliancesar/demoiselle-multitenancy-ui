angular.module('dml')
    .controller('NavBarController', function ($scope, $localStorage, $location) {

        // Mostra o tenant atual
        $scope.selectedTenant = ($localStorage.selectedTenant == undefined ? { id: 0, name: 'Nenhum Tenant Selecionado' } : $localStorage.selectedTenant);

        $scope.$on('change-tenant', function (event, tenant) {
            $localStorage.selectedTenant = tenant;
            $scope.selectedTenant = $localStorage.selectedTenant;
        });

        $scope.getClass = function (path) {
            return ($location.path().substr(0, path.length) === path) ? 'active' : '';
        };

    });