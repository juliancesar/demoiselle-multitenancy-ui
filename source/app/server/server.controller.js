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
            $scope.url = 'http://localhost:8080/app/api/';
            ConfigurationService.setApiUrl($scope.url);
            Notification.success({ message: 'URL da API Selecionada corretamente.' });
        }
        
        $scope.ping = function() {
            $http.get( ConfigurationService.getApiUrl() + "info/ping").then(function() {                
                alert("OK");
            }, function(error) {
                console.log(error);
                alert("ERRO");
            });
        }

        $scope.url = ConfigurationService.getApiUrl();

    });