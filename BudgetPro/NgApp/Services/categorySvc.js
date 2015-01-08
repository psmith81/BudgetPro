'use strict';
angular.module('app').factory('categorySvc', ['$http', 'authSvc', function ($http, authSvc) {

    var cateServiceFactory = {};

    var _getCats = function () {
        console.log("In Get Caegories:");
        return $http.get('/api/account/getCategories')
        .then(function (response) {
            console.log(response.data);
            return response.data;
        });
    }

    cateServiceFactory.getCats = _getCats;

    return cateServiceFactory;
}]);

