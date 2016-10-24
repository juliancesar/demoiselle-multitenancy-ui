angular.module('dml')

    .factory('ValidationService', function ($http, $q, Notification) {
        var service = {};

        // Add all errors
        service.addAll = function ($scope, errors, form) {

            // Limpa tudo antes
            service.clear(form);

            // Adiciona os erros
            angular.forEach(errors, function (value, key) {                
                if (key == 'error') {
                    Notification.error({ message: 'Erro no servidor: ' + value });
                } else {                
                    var splited = key.split("_");
                    key = splited[1];

                    var aux = eval('$scope.' + form.$name + "." + key);
                    aux.$error.server = value;
                    aux.$valid = false;
                }
            });
        };

        // Clean all errors
        service.clear = function (form) {
            angular.forEach(form, function (value, key) {
                if (key[0] != '$') value.$error.server = '';
            });
        };

        return service;
    });