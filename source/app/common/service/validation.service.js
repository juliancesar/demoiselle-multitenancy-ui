angular.module('dml')

    .factory('ValidationService', function ($http, $q, Notification) {
        var service = {};

        // Add all errors
        service.addAll = function ($scope, errors, form, statusCode) {

            console.log("statusCode: " + statusCode);

            // Limpa tudo antes
            service.clear(form);

            if (statusCode == 412) {

                // Adiciona os erros
                angular.forEach(errors, function (errorObj, key) {
                    var splited = errorObj.error.split(".");
                    key = splited[splited.length - 1];

                    var aux = eval('$scope.' + form.$name + "." + key);
                    aux.$error.server = errorObj.error_description;
                    aux.$valid = false;
                });

            } else {
                angular.forEach(errors, function (errorObj, key) {
                    console.log(errorObj);
                    Notification.error({ message: 'Erro no servidor: ' + errorObj.error });
                });
            }
        };

        // Clean all errors
        service.clear = function (form) {
            angular.forEach(form, function (value, key) {
                if (key[0] != '$') value.$error.server = '';
            });
        };

        return service;
    });