angular.module('app').controller('newTransactionController', [ '$scope', 'authSvc', 'accountSvc', '$state', 
    function ($scope, authSvc, accountSvc, $state ) {

        $scope.debit = true;
        $scope.houseAccounts = [{ Name: "", Value: "" }];
        $scope.newTrans = {
            AccountId: null,
            Amount: null,
            SignedAmount: null,
            Date: "",
            Description: "",
            Updated: "",
            UpdatedByUserId: null,
            CategoryId: null,
            Reconciled: false,
            HouseholdId: null
        }

        //$scope.getHouseAccts = function () {
        //    accountSvc.getAccountsByHousehold().then(function () {
        //        $scope.houseAccounts = [{data.Name, data.Id}];
        //        $state.go('home.dashboard');
        //    }, function () {
        //        alert("Transacation failed.");
        //        $state.go('home.dashboard');
        //    }
        //    )};
        //$scope.getHouseAccts();
        //console.log($scope.getHouseAccts);

        $scope.newTransaction = function () {
            var cdf = new Date();
            //var cd = cdf.g + "/" + cdf.getDate() + "/" + cdf.getFullYear();
            var cd = cdf.toDateString();
            console.log("newTransaction");

            if ($scope.debit)
                $scope.newTrans.SignedAmount = $scope.newTrans.Amount * -1;
            $scope.newTrans.Date = cd;
            $scope.newTrans.Updated = cd;
            $scope.newTrans.UpdatedByUserId = authSvc.getUserId();
            $scope.newTrans.HouseholdId = authSvc.getHousehold();
            console.log($scope.newTrans);
            accountSvc.addTransaction($scope.newTrans).then(function () {
                $state.go('home.dashboard');
            }, function () {
                alert("Transacation failed.");
                $state.go('home.dashboard');
            }
            )};
    }])

