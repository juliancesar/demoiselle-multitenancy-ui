angular.module('dml')
    .controller('ProductController', function ($scope, $http, Notification, $rootScope, ConfigurationService, CategoryService, ProductService, ValidationService) {

        $scope.tenant = ConfigurationService.getTenant();

        $scope.refreshList = function () {
            ProductService.list().then(function (response) {
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
                ProductService.create($scope.product).then(function () {
                    $scope.refreshList();
                    $scope.resetForm(form);

                    Notification.success({ message: 'Product successfully registered.' });
                }, function (response) {
                    ValidationService.addAll($scope, response.data, form, response.status);
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

            $scope.product = {};

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
                    $scope.refreshListCategory();
                    $scope.resetFormCategory(formCategory);

                    Notification.success({ message: 'Category successfully registered.' });
                }, function (response) {
                    ValidationService.addAll($scope, response.data, formCategory, response.status);
                });
            } else {
                console.log("Dados do formulário inválidos.");
            }
        };

        $scope.refreshListCategory = function () {
            CategoryService.list().then(function (response) {
                $scope.listCategory = response.data;
                $scope.totalCategory = response.data.lenght;
            }, function (response) {
                Notification.error({ message: 'Ocorreu um erro na listagem, tente novamente.' });
            });
        };

        $scope.deleteCategory = function (cat) {
            CategoryService.remove(cat).then(function (response) {
                $scope.refreshListCategory();
            }, function (response) {
                Notification.error({ message: 'Verifique os dados e tente novamente' });
            });
        };

        $scope.resetFormCategory = function (form) {
            ValidationService.clear(form);

            $scope.category = {};

            form.$setPristine();
            form.$setUntouched();
        };

        $scope.refreshListCategory();

    });