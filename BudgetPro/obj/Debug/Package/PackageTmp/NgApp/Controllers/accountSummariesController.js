angular.module('app').controller('accountSummariesController', ['$scope', '$state', '$stateParams', 'houseAccts', 'accountSvc',
    function ($scope, $state, $stateParams, houseAccts, accountSvc) {
        $scope.balRefresh = accountSvc.updateAcctBal;
        $scope.houseaccts = houseAccts;
        $scope.acctIsCol = false;
        console.log(houseAccts);
    }]);

