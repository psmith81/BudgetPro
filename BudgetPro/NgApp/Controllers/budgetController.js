angular.module('app').controller('budgetController', ['$scope', 'categorySvc', 'budgetSvc', 'authSvc', '$state', '$stateParams',
    function ($scope, categorySvc, budgetSvc, authSvc, $state, $stateParams) {

        $scope.newBudgetItem = {
            HouseholdId: null,
            CategoryId: null,
            Description: null,
            Amount: null,
            Expense: null,
            Period: null
        }
        $scope.expense = "expense";
        $scope.selectedCat = null;

        categorySvc.refreshCats();
        $scope.getCats = categorySvc.getCats;
        
        $scope.addBudgetItem = function () {
            $scope.newBudgetItem.HouseholdId = authSvc.getHousehold();
            $scope.newBudgetItem.CategoryId = $scope.selectedCat.id;
            if ($scope.expense == "expense")
                $scope.newBudgetItem.Expense = true;
            else
                $scope.newBudgetItem.Expense = false;
            console.log($scope.newBudgetItem);
            budgetSvc.addBudgetItem($scope.newBudgetItem);
        }

    }])