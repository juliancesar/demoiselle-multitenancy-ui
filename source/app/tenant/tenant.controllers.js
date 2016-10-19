angular.module('dml')
    .controller('TenantController', function ($scope, $http, Notification, $rootScope, ConfigurationService, TenantService) {
        $scope.tenants = [];

        $scope.refreshList = function () {
            $http.get('http://localhost:8080/app/api/multiTenancy/list').then(function (response) {
                $scope.tenants = response.data;
            }, function (response) {
                console.log(response);
            });
        };

        $scope.create = function (name) {
            TenantService.create(name).then(function (response) {
                $scope.name = '';
                $scope.refreshList();
            }, function (response) {
                console.log(response);
                Notification.error({ message: 'Verifique os dados e tente novamente' });
            });
        };

        $scope.deleteTenant = function (tenant) {
            TenantService.remove(tenant).then(function (response) {
                $scope.name = '';
                $scope.refreshList();
            }, function (response) {
                Notification.error({ message: 'Verifique os dados e tente novamente' });
            });
        };

        $scope.select = function (tenant) {
            delete tenant.$$hashKey;
            Notification.success({ message: 'O Tenant [' + tenant.name + '] foi selecionado corretamente.' });

            // Avisa que o Tenant mudou
            $rootScope.$broadcast('change-tenant', tenant);
        };

        $scope.refreshList();

    });