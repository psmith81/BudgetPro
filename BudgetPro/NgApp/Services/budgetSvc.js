'use strict';
angular.module('app').factory('budgetSvc', ['$http', 'authSvc', function ($http, authSvc) {
    var factory = {};
    var _expenseItems = null;
    var _incomeItems = null;
    var _budgetStatus = null;

    var _addBudgetItem = function (newBudgetItem) {
        return $http.post('/api/account/addBudgetItem', newBudgetItem)
        .then(function (response) {
            //console.log(response.data);
            return response.data;
        })
    }

    // Start Budget Items
    var _selectBudgetItems = function (expense) {
        var query = {};
        query.householdId = authSvc.getHousehold();
        query.expense = expense;
        return $http.post('/api/account/getBudgetItems', query)
        .then(function (response) {
            //console.log(response.data);
            return response.data;
        })
    }

    var _refreshExpenseItems = function () {
        _selectBudgetItems(1).then(function (response) {
            _expenseItems = response;
        })
    }

    var _refreshIncomeItems = function () {
        _selectBudgetItems(0).then(function (response) {
            _incomeItems = response;
        })
    }

    _refreshExpenseItems();
    _refreshIncomeItems();

    var _getExpenseItems = function () {
        return _expenseItems;
    }

    var _getIncomeItems = function () {
        return _incomeItems;
    }

    var _deleteBudgetItem = function (itemId) {
        $http.post('/api/account/deleteBudgetItem', itemId);
        _refreshExpenseItems();
        _refreshIncomeItems();
    }

    // Start Budget Status
    var _selectBudgetStat = function () {
        return $http.get('/api/account/getBudgetStatus')
        .then(function (response) {
            console.log(response.data);
            return response.data;
        })
    }

    var _refreshBudgetStat = function () {
        _selectBudgetStat().then(function (response) {
            _budgetStatus = response;
        })
    }

    _refreshBudgetStat();

    var _getBudgetStat = function () {
        return _budgetStatus;
    }

    factory.addBudgetItem = _addBudgetItem;
    factory.getExpenseItems = _getExpenseItems;
    factory.getIncomeItems = _getIncomeItems;
    factory.refreshExpenseItems = _refreshExpenseItems;
    factory.refreshIncomeItems = _refreshIncomeItems;
    factory.deleteBudgetItem = _deleteBudgetItem;
    factory.getBudgetStatus = _getBudgetStat;
    factory.refreshBudgetStatus = _refreshBudgetStat;

    return factory;
}]);