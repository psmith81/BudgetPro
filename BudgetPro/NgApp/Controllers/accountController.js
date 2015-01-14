angular.module('app').controller('accountController', ['$scope', 'categorySvc', 'accountSvc', '$state', '$stateParams',
    function ($scope, categorySvc, accountSvc, $state, $stateParams) {

        $scope.atParams = {
            accountId: $stateParams.accountId,
            rowoffset: 0,
            numrows: 10
        }
        $scope.editTrans = null;
        $scope.selectedCat = null;

        $scope.selectTrans = function (transId) {
            //console.log("selectTrans:")
            $scope.editTrans = transId;
            $scope.selectedCat = $scope.editTrans.categoryId;
            $scope.dt = $scope.editTrans.transDate;
        }
 
        $scope.getCats = categorySvc.getCats;

        $scope.activeAccountId = $stateParams.accountId;
        accountSvc.getAccount($stateParams.accountId).then(function (results) {
            $scope.activeAccount = results;
        })

        accountSvc.getAcctTransCount($stateParams.accountId).then(function (results) {
            //console.log(results)
            $scope.acctTransCount = results;
        })
        accountSvc.refreshAcctTransactions($scope.atParams);

        //accountSvc.getAcctTransactions().then(function (results) {
        //    $scope.acctTransactions = results;
        //});
        $scope.acctTransactions = accountSvc.getAcctTransactions;
        $scope.refreshAcctTransactions = accountSvc.refreshAcctTransactions;
        
        // Date Picker Items
        $scope.minDate = "1/1/2010";
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function (date, mode) {
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };

        $scope.toggleMin = function () {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['MM/dd/yyyy', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
}])