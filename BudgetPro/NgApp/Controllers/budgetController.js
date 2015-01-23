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
        $scope.budgetStatus = null;
        $scope.expense = "expense";
        $scope.selectedCat = null;
        $scope.IncomeItems = null;
        $scope.ExpenseItems = null;

        categorySvc.refreshCats();
        $scope.getCats = categorySvc.getCats;
        
        $scope.addBudgetItem = function () {
            $scope.newBudgetItem.HouseholdId = authSvc.getHousehold();
            $scope.newBudgetItem.CategoryId = $scope.selectedCat.id;
            if ($scope.expense == "expense")
                $scope.newBudgetItem.Expense = true;
            else
                $scope.newBudgetItem.Expense = false;
            //console.log($scope.newBudgetItem);
            budgetSvc.addBudgetItem($scope.newBudgetItem).then(function () {
                $scope.expense = "expense";
                $scope.selectedCat = null;
                $scope.newBudgetItem = {
                    HouseholdId: null,
                    CategoryId: null,
                    Description: null,
                    Amount: null,
                    Expense: null,
                    Period: null
                }
                budgetSvc.refreshExpenseItems();
                budgetSvc.refreshIncomeItems();
            })
        }

        $scope.IncomeItems = budgetSvc.getIncomeItems;

        $scope.ExpenseItems = budgetSvc.getExpenseItems;

        $scope.deleteItem = function (itemId) {
            budgetSvc.deleteBudgetItem(itemId);
            budgetSvc.refreshExpenseItems();
            budgetSvc.refreshIncomeItems();
        }

        $scope.budgetStatus = budgetSvc.getBudgetStatus;

    }])