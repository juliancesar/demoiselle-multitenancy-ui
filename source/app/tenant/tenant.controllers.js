angular.module('dml')
    .controller('TenantController', function ($scope, $http, Notification, $rootScope, ConfigurationService, TenantService) {
        $scope.tenants = [];

        $scope.refreshList = function () {
            TenantService.list().then(function (response) {
                $scope.tenants = response.data;
            }, function (response) {
                console.log(response);
            });
        };

        $scope.create = function (form, name) {

            // Valida
            form.$setSubmitted();

            if (form.$valid) {
                TenantService.create(name).then(function (response) {
                    $scope.name = '';
                    $scope.refreshList();

                    form.$setPristine();
                    form.$setUntouched();
                }, function (response) {
                    console.log(response);
                    Notification.error({ message: 'Verifique os dados e tente novamente' });
                });
            } else {
                console.log("Dados do formulário inválidos.");
            }

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

        $scope.$on('change-tenant', function (event, tenant) {
            $scope.selectedTenant = ConfigurationService.getTenant();
            $scope.refreshList();
        });

        $scope.selectedTenant = ConfigurationService.getTenant();
        $scope.refreshList();

    });