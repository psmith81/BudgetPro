angular.module('app').controller('newTransactionController', ['$scope', 'categorySvc', 'authSvc', 'accountSvc', '$state', '$stateParams',
    function ($scope, categorySvc, authSvc, accountSvc, $state, $stateParams) {

        $scope.debit = true;
        $scope.selectedAcct = $stateParams.accountId;

        $scope.selectedCat = "";

        $scope.getCats = categorySvc.getCats;

        //$scope.myCats().then(function (data) {
        //    $scope.categories = data;
        //    $scope.selectedCat = $scope.categories[0];
        //});


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

        //console.log($scope.houseaccts);

        $scope.newTransaction = function () {
            var cdf = new Date();
            var cd = cdf.toDateString();
            $scope.newTrans.AccountId = $scope.selectedAcct;
            if ($scope.debit) {
                $scope.newTrans.SignedAmount = $scope.newTrans.Amount * -1;
            } else {
                $scope.newTrans.SignedAmount = $scope.newTrans.Amount;
            }
            $scope.newTrans.Date = cd;
            $scope.newTrans.Updated = cd;
            $scope.newTrans.UpdatedByUserId = authSvc.getUserId();
            $scope.newTrans.HouseholdId = authSvc.getHousehold();
            $scope.newTrans.CategoryId = $scope.selectedCat.id;
            //console.log($scope.newTrans)
            accountSvc.addTransaction($scope.newTrans).then(function () {
                //accountSvc.updateAccountBalances($scope.newTrans.AccountId);
                $state.go('home.dashboard');
            }, function () {
                console.log($scope.newTrans);
                alert("Transacation failed.");
                $state.go('home.dashboard');
            })
        };

       
    }])

