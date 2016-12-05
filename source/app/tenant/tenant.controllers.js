angular.module('dml')
    .controller('TenantController', function ($scope, $http, Notification, $rootScope, ConfigurationService, TenantService, $q) {
        $scope.tenants = [];

        $scope.tenant = {};

        $scope.script = 'usuario.setName(tenant.getName() + " - " + usuario.getName());';

        $scope.refreshList = function () {
            TenantService.list().then(function (response) {

                var finalList = [];

                angular.forEach(response.data, function (t, key) {
                    if (t.configuration)
                        t.configuration = JSON.parse(t.configuration);
                    this.push(t);
                }, finalList);

                $scope.tenants = finalList;
            }, function (response) {
                console.log(response);
            });
        };

        $scope.create = function (form, tenant) {

            // Valida
            form.$setSubmitted();

            var configurationJson = { createUserScript: tenant.createUserScript };
            var finalTenant = { name: tenant.name, configuration: JSON.stringify(configurationJson) };

            // console.log(finalTenant);

            if (form.$valid) {
                var promisses = TenantService.create(finalTenant);
                
                $q.all(promisses).then(function (response) {
                    $scope.tenant = {};
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
            var promisses = TenantService.remove(tenant);
            
            $q.all(promisses).then(function (response) {
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