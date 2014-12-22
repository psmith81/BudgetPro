angular.module('app').controller('homeController', [ '$scope', 'authSvc', 'accountSvc', 'householdSvc', '$state', '$stateParams','$modal', '$log',
    function ($scope, authSvc, accountSvc, householdSvc, $state, $stateParams, $modal, $log) {

        $scope.getAuth = authSvc.getAuth;
        $scope.household = "";

        $scope.getHoushold = householdSvc.getHousehold;
        
        $scope.getHoushold().then(function (data) {
            $scope.household = data != null ? data.name : null;
        });

            //$scope.houseaccts = {
            //    Id: null,
            //    HouseholdId: null, 
            //    Name: "", 
            //    Balance: null, 
            //    ReconciledBalance: false
            //}

            $scope.newacct = {
                Id: null,
                HouseholdId: null,
                Name: "",
                Balance: null,
                ReconciledBalance: false
            }
        
            //$scope.recentrans = {
            //    Date: "",
            //    Category: "",
            //    User: "",
            //    Amount: null,
            //    Description: "" 
            //}

            //// Widget Collapse Control Objects
            //$scope.acctIsCol = false;
            //$scope.transIsCol = false;
            //$scope.graphIsCol = false;

            $scope.newAccShow = false;


            $scope.getAccountsByHousehold = function () {
                accountSvc.getAccountsByHousehold().then(function (data) {
                    $scope.houseaccts = data;
                })
            }
            $scope.getAccountsByHousehold();

            $scope.subAccount = function () {
                $scope.newacct.HouseholdId = authSvc.getHousehold();
                $scope.newacct.ReconciledBalance = true;
                console.log($scope.newacct);
                accountSvc.addAccount($scope.newacct).then(function () {
                    $state.go("home.dashboard");
                }, function () {
                    alert("Account Insert failed.");
                    $state.go('accounts');
                });
            }

            //$scope.getRecentTransByHousehold = function () {
            //    accountSvc.getRecentTransByHousehold().then(function (data) {
            //        $scope.recentrans = data;
            //    })
            //}
            //$scope.getRecentTransByHousehold();

            ////$scope.subTransaction = function ()

    }]);
 