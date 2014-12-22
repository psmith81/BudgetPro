'use strict';
angular.module('app').factory('householdSvc', ['$http', 'authSvc', function ($http, authSvc) {

    var factory = {};

    factory.getHousehold = function () {
        return $http.get('api/authentication/getHousehold')
        .then(function (response) {
            return response.data;
        });
    }

    factory.createHousehold = function (newHousehold) {
        if (authSvc.authentication.householdId == "") {
            return $http.post('api/authentication/createHousehold', newHousehold)
            .then(function (response) {
                return response.data;
            });
        }
    }

    return factory;
}]);