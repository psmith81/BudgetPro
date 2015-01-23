'use strict';
angular.module('app').factory('budgetSvc', ['$http', 'authSvc', function ($http, authSvc) {
    var factory = {};

    var _addBudgetItem = function (newBudgetItem) {
        return $http.post('/api/account/addBudgetItem', newBudgetItem)
        .then(function (response) {
            //console.log(response.data);
            return response.data;
        })
    }

    var _getBudgetItems = function (expense) {
        var query = {};
        query.householdId = authSvc.getHousehold();
        query.expense = expense;
        return $http.post('/api/account/getBudgetItems', query)
        .then(function (response) {
            console.log(response.data);
            return response.data;
        })
    }

    factory.addBudgetItem = _addBudgetItem;
    factory.getBudgetItems = _getBudgetItems;

    return factory;
}]);