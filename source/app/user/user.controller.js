angular.module('dml')
    .controller('UserController', function ($scope, $http, Notification, $rootScope, ConfigurationService, $state, UserService, ValidationService) {

        $scope.user = { role: "ADMINISTRATOR" };
        $scope.tenant = ConfigurationService.getTenant();

        $scope.refreshList = function () {
            UserService.list().then(function (response) {
                $scope.list = response.data;
                $scope.total = response.data.lenght;
            }, function (response) {
                Notification.error({ message: 'Ocorreu um erro na listagem, tente novamente.' });
            });
        };

        $scope.create = function (form) {
            // Valida
            form.$setSubmitted();

            if (form.$valid) {
                UserService.create($scope.user).then(function () {
                    $scope.refreshList();
                    $scope.resetForm(form);

                    Notification.success({ message: 'Usuário cadastrado com sucesso.' });
                }, function (response) {
                    ValidationService.addAll($scope, response.data, form, response.status);
                });
            } else {
                console.log("Dados do formulário inválidos.");
            }
        };
        
         $scope.deleteUser = function (user) {
            UserService.remove(user).then(function (response) {
                $scope.refreshList();
            }, function (response) {
                Notification.error({ message: 'Verifique os dados e tente novamente' });
            });
        };

        $scope.resetForm = function (form) {
            ValidationService.clear(form);

            $scope.user = { role: "ADMINISTRATOR" };

            form.$setPristine();
            form.$setUntouched();
        };

        $scope.refreshList();

    });