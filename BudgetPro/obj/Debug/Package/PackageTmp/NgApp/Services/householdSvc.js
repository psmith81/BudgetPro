'use strict';
angular.module('app').factory('householdSvc', ['$http', 'authSvc', 'categorySvc',function ($http, authSvc, categorySvc) {

    var factory = {};

    factory.getHousehold = function () {
        //console.log ("about to get household")
        return $http.get('api/authentication/getHousehold')
        .then(function (response) {
            //console.log(response.data);
            return response.data;
        });
    }

    factory.createHousehold = function (newHousehold) {
        if (authSvc.authentication.householdId == "") {
            return $http.post('api/authentication/createHousehold', newHousehold)
            .then(function (response) {
                categorySvc.makeCat({Id:null,householdId:null,Name:"Deposits"});
                categorySvc.makeCat({Id:null,householdId:null,Name:"Cash"});
                categorySvc.makeCat({Id:null,householdId:null,Name:"Bills"});
                categorySvc.makeCat({ Id: null, householdId: null, Name: "Discretionary" });

                return response.data;
            });
        }
    }

    factory.joinHousehold = function (householdId) {
        return $http.post('api/authentication/joinHousehold', householdId)
        .then(function (response) {
            return response.data;
        });
    }

    return factory;
}]);