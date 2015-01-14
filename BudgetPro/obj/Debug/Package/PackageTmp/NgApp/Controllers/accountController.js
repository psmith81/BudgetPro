angular.module('app').controller('accountController', ['$scope', 'accountSvc', '$state', '$stateParams',
    function ($scope, accountSvc, $state, $stateParams) {

        $scope.atParams = {
            accountId: $stateParams.accountId,
            rowoffset: 0,
            numrows: 10
        }

        $scope.activeAccountId = $stateParams.accountId;
        accountSvc.getAccount($stateParams.accountId).then(function (results) {
            $scope.activeAccount = results;
        })

        accountSvc.getAcctTransCount($stateParams.accountId).then(function (results) {
            console.log(results)
            $scope.acctTransCount = results;
        })
        accountSvc.refreshAcctTransactions($scope.atParams);

        //accountSvc.getAcctTransactions().then(function (results) {
        //    $scope.acctTransactions = results;
        //});
        $scope.acctTransactions = accountSvc.getAcctTransactions;
        
}])