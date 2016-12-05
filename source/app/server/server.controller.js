angular.module('dml')
    .controller('ServerController', function ($scope, $http, Notification, $rootScope, ConfigurationService, TenantService, $q) {

        $scope.setServerUrl = function (form, url) {

            // Valida
            form.$setSubmitted();

            if (form.$valid) {
                ConfigurationService.setServerUrl(url);
                $scope.url = ConfigurationService.getServerUrl();
                Notification.success({ message: 'URL da API Selecionada corretamente.' });
            } else {
                console.log("Formulário não é valido.");
            }
        };

        $scope.setServerUrlLocalhost = function () {
            $scope.url = 'http://localhost:8080/';
            ConfigurationService.setServerUrl($scope.url);
            Notification.success({ message: 'URL da API Selecionada corretamente.' });
        }

        $scope.ping = function () {

            var urls = TenantService.getApiUrlToTenantTypes();
            var promisses = [];

            for (var i in urls) {
                var urlFinal = urls[i];
                promisses.push($http.get(urlFinal + "info/ping"));
            }

            $q.all(promisses).then(function () {
                Notification.success({ message: 'APIs acessíveis.' });
            }, function (error) {
                Notification.error({ message: 'Uma ou mais APIs não estão acessíveis, verifique a API ' + error.config.url });
            });

        }

        $scope.ping();

        $scope.url = ConfigurationService.getServerUrl();

    });
