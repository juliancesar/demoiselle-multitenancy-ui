angular.module('dml')
    .controller('ProductController', function ($scope, $http, Notification, $rootScope, ConfigurationService, CategoryService, ProductService, ValidationService) {

        $scope.product = { role: "ADMINISTRATOR" };
        $scope.tenant = ConfigurationService.getTenant();

        $scope.refreshList = function () {
            ProductService.list().then(function (response) {
                $scope.list = response.data.content;
                $scope.total = response.data.total;
            }, function (response) {
                Notification.error({ message: 'Ocorreu um erro na listagem, tente novamente.' });
            });
        };

        $scope.create = function (form) {
            // Valida
            form.$setSubmitted();

            if (form.$valid) {
                ProductService.create($scope.product).then(function () {
                    $scope.refreshList();
                    $scope.resetForm(form);

                    Notification.success({ message: 'Usuário cadastrado com sucesso.' });
                }, function (response) {
                    ValidationService.addAll($scope, response.data, form);
                });
            } else {
                console.log("Dados do formulário inválidos.");
            }
        };

        $scope.deleteProduct = function (product) {
            ProductService.remove(product).then(function (response) {
                $scope.refreshList();
            }, function (response) {
                Notification.error({ message: 'Verifique os dados e tente novamente' });
            });
        };

        $scope.resetForm = function (form) {
            ValidationService.clear(form);

            $scope.product = { role: "ADMINISTRATOR" };

            form.$setPristine();
            form.$setUntouched();
        };

        $scope.refreshList();


        // Category

        $scope.createCategory = function (formCategory) {
            // Valida
            formCategory.$setSubmitted();

            if (formCategory.$valid) {
                CategoryService.create($scope.category).then(function () {
                    $scope.refreshList();
                    $scope.resetForm(formCategory);

                    Notification.success({ message: 'Category successfully registered.' });
                }, function (response) {
                    ValidationService.addAll($scope, response.data, formCategory);
                });
            } else {
                console.log("Dados do formulário inválidos.");
            }
        };

        $scope.refreshListCategory = function () {
            CategoryService.list().then(function (response) {
                $scope.listCategory = response.data.content;
                $scope.totalCategory = response.data.total;
            }, function (response) {
                Notification.error({ message: 'Ocorreu um erro na listagem, tente novamente.' });
            });
        };

        $scope.refreshListCategory();

    });