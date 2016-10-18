angular.module('dml')
    .controller('UserController', function ($scope, $http, Notification, $rootScope, $localStorage, $state) {
        
        if ($localStorage.selectedTenant == undefined ||  $localStorage.selectedTenant == "") {
            Notification.error({ message: 'Selecione um Tenant' });
            $state.go("tenants");
        }
        
        $scope.tenant = $localStorage.selectedTenant;
        
        $scope.refreshList = function() {
            
            var getUrl = 'http://localhost:8080/app/api/' +  $scope.tenant.name + '/usuario';
            
            $http({
                method: 'GET',
                url: getUrl
            }).then(function (response) {
                $scope.list = response.data;
            }, function (response) {
                Notification.error({ message: 'Ocorreu um erro na listagem, tente novamente.' });
            });
        };
        
        
        $scope.refreshList();
        
    });