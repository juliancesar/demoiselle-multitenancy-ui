angular.module('dml')
    .controller('UserController', function ($scope, $http, Notification, $rootScope, $localStorage, $state) {
        
        if ($localStorage.selectedTenant == undefined ||  $localStorage.selectedTenant == "") {
            Notification.error({ message: 'Selecione um Tenant' });
            $state.go("tenants");
        }
        
        $scope.tenant = $localStorage.selectedTenant;
        
        
    });