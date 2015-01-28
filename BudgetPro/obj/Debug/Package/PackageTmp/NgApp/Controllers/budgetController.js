angular.module('app').controller('budgetController', ['$http', '$scope', 'categorySvc', 'budgetSvc', 'authSvc', '$state', '$stateParams', /*newBudgetItem*/
    function ($http, $scope, categorySvc, budgetSvc, authSvc, $state, $stateParams /*, newBudgetItem*/) {
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
        $scope.graphtog = true;
        $scope.tabletog = true;

        //var budstat = [];

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
                budgetSvc.refreshBudgetStatus();
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

        $scope.$watch(
            function (scope) {
                return scope.budgetStatus();
            }, function (newValue) {
                console.log(newValue);
                if (newValue != null) {
                    var d1 = [];
                    var d2 = [];
                    var d3 = [];
                    var count = 1;
                    for(key in newValue)
                    {
                        if (newValue[key].category != "Income")
                        {
                            d1.push([count, newValue[key].budgeted]);
                            d2.push([count, newValue[key].current]);
                            d3.push([count, newValue[key].previous]);
                            count++;
                        }
                    }
                    d1 = { label: "Budget", data: d1 };
                    d2 = { label: "Spending: Current", data: d2 };
                    d3 = { label: "Previous Month's", data: d3 };
                    plotwithoptions(d1,d2,d3);
                }
            })

        var stack = false, bars = false, lines = false, steps = false;

        function plotwithoptions(d1, d2, d3) {
            $.plot($("#bar-chart"), [d1, d2, d3], {
                series: {
                    stack: stack,
                    lines: { show: lines, fill: true, steps: steps },
                    bars: { show: bars, barwidth: 0.8 }
                },
                grid: {
                    borderwidth: 0, hoverable: true, color: "#777"
                },
                //colors: ["#ff6c24", "#ff2424"],
                colors: ["#70cde9", "#4150da"],
                bars: {
                    show: true,
                    linewidth: 0,
                    fill: true,
                    fillcolor: { colors: [{ opacity: 0.9 }, { opacity: 0.8 }] }
                }
            });
        }

        

    }])