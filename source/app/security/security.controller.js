angular.module('dml')
    .controller('SecurityController', function ($scope, $http, Notification, TenantService, $rootScope, ConfigurationService, ValidationService, SecurityService) {
        $scope.tenant = ConfigurationService.getTenant();

        $scope.credentials = {};
        $scope.token = "Token JWT não carregado!";
        $scope.resultRequest = {};
        $scope.dateRequest = new Date();

        $scope.login = function (form) {

            // Valida
            form.$setSubmitted();

            if (form.$valid) {

                // Faz o login da aplicação
                SecurityService.login($scope.credentials.username, $scope.credentials.password).then(function (response) {
                    var token = response.data.token;
                    
                    // console.log(token);                    
                    // console.log(response.data);
                    
                    // Adiciona em todos os headers
                    $http.defaults.headers.common['Authorization'] = 'Token ' + token;

                    // $scope.token = response.data;
                    
                    var decoded = jwt_decode(token);                    
                    $scope.token = decoded;

                    Notification.success({ message: 'Usuário Logado com sucesso.' });
                }, function (response) {
                    $http.defaults.headers.common['Authorization'] = '';
                    $scope.token = 'Erro';
                    
                    ValidationService.addAll($scope, response.data, form, response.status);
                });

            } else {
                console.log("Dados do formulário inválidos.");
            }

        };
        
        $scope.testRequest = function(url) {
            var tenant = ConfigurationService.getTenant();

            $http({
                method: 'GET',
                url: TenantService.getUrlForTenantType('user') + tenant.name + '/testRoleAndPermission/' + url                
            }).then(function(response) {
                 console.log(response.data);            

                 $scope.statusRequest = response.status;

                 $scope.resultRequest = response.data; 
                 $scope.dateRequest = new Date();
            }, function(response) {
                 console.log(response.data);

                $scope.statusRequest = response.status;

                 $scope.resultRequest = response.data;
                 $scope.dateRequest = new Date();
            });
        };
    });