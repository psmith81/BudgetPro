angular.module('app').controller('accountController', ['$scope', 'categorySvc', 'accountSvc', 'authSvc', '$state', '$stateParams',
    function ($scope, categorySvc, accountSvc, authSvc, $state, $stateParams) {

        $scope.atParams = {
            accountId: $stateParams.accountId,
            rowoffset: 0,
            numrows: 7
        }
        $scope.editTrans = null;
        $scope.selectedCat = null;
        $scope.showpage = null;
        $scope.debit = null;
        var Trans = {
            Id: null,
            AccountId: null,
            Amount: null,
            SignedAmount: null,
            Date: null,
            Description: null,
            Updated: null,
            UpdatedByUserId: null,
            CategoryId: null,
            Reconciled: null,
            HouseholdId: null,
        }

        $scope.selectTrans = function (transId) {   // used to select a transaction for editing
            //console.log("selectTrans:")
            $scope.editTrans = transId;
            if (transId.signedAmount < 0)
                $scope.debit = true;
            else
                $scope.debit = false;
            $scope.selectedCat = $scope.editTrans.categoryId;
            $scope.dt = $scope.editTrans.transDate;
        }

        $scope.updateRec = function (transId) {   // used to select a transaction for editing
            console.log("updateRec:")
            $scope.editTrans = transId;
            if (transId.signedAmount < 0)
                $scope.debit = true;
            else
                $scope.debit = false;
            $scope.updateTransaction();
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

        $scope.acctTransactions = accountSvc.getAcctTransactions;
        $scope.refreshAcctTransactions = function () {
            accountSvc.refreshAcctTransactions($scope.atParams);
        }

        $scope.updateTransaction = function () {
            console.log("updateTransactions");
            console.log($scope.editTrans);
            Trans.Id = $scope.editTrans.id;
            Trans.AccountId = $scope.editTrans.accountId;
            Trans.Amount = $scope.editTrans.amount;
            Trans.SignedAmount = 1;
            Trans.Date = $scope.editTrans.transDate;
            Trans.Description = $scope.editTrans.description;
            Trans.Updated = $scope.editTrans.updated;
            Trans.UpdatedByUserId = authSvc.getUserId();
            Trans.CategoryId = $scope.editTrans.categoryId;
            Trans.Reconciled = $scope.editTrans.reconciled;
            Trans.HouseholdId = $scope.editTrans.householdId;
            console.log("CategoryId: [" + $scope.selectedCat + "]");
            console.log($scope.selectedCat);
            var cdf = new Date();
            var cd = cdf.toDateString();
            Trans.Updated = cd;
            console.log($scope.debit);
            if ($scope.debit === true) {
                console.log("evaled true, making amount neg.");
                Trans.SignedAmount = Math.abs(Number(Trans.Amount)) * -1;
                $scope.editTrans.signedAmount = Trans.SignedAmount;
            } else {
                console.log("evaled false, making amount pos."  );
                Trans.SignedAmount = Math.abs(Number(Trans.Amount));
                $scope.editTrans.signedAmount = Trans.SignedAmount;
            }
            Trans.UpdatedByUserId = authSvc.getUserId();
            console.log("updating with [" + Trans + "]");
            console.log(Trans);
            console.log($scope.selectedCat);
            $scope.editTrans = "";
            accountSvc.updateTransaction(Trans).then(function () {
                
                accountSvc.refreshAcctTransactions($scope.atParams);
                accountSvc.getAccount($stateParams.accountId).then(function (results) {
                    $scope.activeAccount = results;
                })
            }, function () {
                console.log($scope.editTrans);
                alert("Transacation failed.");
                $state.go('home.dashboard');
            })
        };

        // Pagination
        var _paging = function () {
            $scope.activeAccount = accountSvc.getAccount($stateParams.accountId);
            if (Number($scope.acctTransCount) <= Number($scope.atParams.numrows))
                $scope.showpage = false;
            else
                $scope.showpage = true;
        }
         _paging();

        $scope.changenumrows = function () {
            if ((Number($scope.atParams.numrows) > 0)) {
                _paging();
                $scope.atParams.rowoffset = 0;
                accountSvc.refreshAcctTransactions($scope.atParams);
            }
        }

        $scope.prev = function () {
            $scope.atParams.rowoffset = Number($scope.atParams.rowoffset - $scope.atParams.numrows);
            if ($scope.atParams.rowoffset < 0) {
                $scope.atParams.rowoffset = 0;
            }
            accountSvc.refreshAcctTransactions($scope.atParams);
        }
        $scope.next = function () {
            if (Number(($scope.atParams.rowoffset) + Number($scope.atParams.numrows )) <= Number($scope.acctTransCount)) {
                $scope.atParams.rowoffset = Number($scope.atParams.rowoffset) + Number($scope.atParams.numrows);
            }
            accountSvc.refreshAcctTransactions($scope.atParams);
        }
        
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