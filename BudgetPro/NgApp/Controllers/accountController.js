angular.module('app').controller('accountController', ['$scope', 'accountSvc', '$state', '$stateParams',
    function ($scope, accountSvc, $state, $stateParams) {

        $scope.activeAccountId = $stateParams.accountId;
        accountSvc.getAccount($stateParams.accountId).then(function(results){
            $scope.activeAccount = results;
        })

        //$scope.activeAccount = "Hello World";
    
}])