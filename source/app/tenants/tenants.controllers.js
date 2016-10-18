angular.module('dml')
    .controller('TenantsController', function ($scope, $http) {
        $scope.tenants = [];
        
        $http.get('http://localhost:8080/app/api/multiTenancy/list').then(function(response) {
           $scope.tenants = response.data;
        }, function(response) {
            console.log(response);
        });        

    });