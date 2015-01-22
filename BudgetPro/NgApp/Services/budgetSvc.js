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

    factory.addBudgetItem = _addBudgetItem;

    return factory;
}]);