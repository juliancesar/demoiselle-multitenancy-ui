angular.module('dml')
    .controller('ServerController', function ($scope, $http, Notification, $rootScope, ConfigurationService) {

        $scope.setApiUrl = function (form, url) {
            
            // Valida
            form.$setSubmitted();
            
            if (form.$valid) {
                ConfigurationService.setApiUrl(url);
                $scope.url = ConfigurationService.getApiUrl();
                Notification.success({ message: 'URL da API Selecionada corretamente.' });
            } else {
                console.log("Formulário não é valido.");
            }
        };

        $scope.setApiUrlLocalhost = function () {
            $scope.url = 'http://localhost:8080/user/api/';
            ConfigurationService.setApiUrl($scope.url);
            Notification.success({ message: 'URL da API Selecionada corretamente.' });
        }
        
        $scope.ping = function() {
            $http.get(ConfigurationService.getApiUrl() + "info/ping").then(function() {                
                Notification.success({ message: 'API Acessível.' });
            }, function(error) {
                // console.log(error);
                Notification.error({ message: 'A API não está acessíveo, verifique.' });
            });
        }
        
        $scope.ping();

        $scope.url = ConfigurationService.getApiUrl();

    });