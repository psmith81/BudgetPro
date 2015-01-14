'use strict';
angular.module('app').factory('categorySvc', ['$http', 'authSvc', function ($http, authSvc) {

    var cateServiceFactory = {};
    var _cats = "";
    var _catSums = "";

    // call to API to get categories for household
    var _selectCats = function () {
        return $http.get('/api/account/getCategories');
    }

    // used both internally by service and externally by controllers to instantiate a category call
    var _refreshCats = function () {
        _selectCats().then(function(results) {
            _cats = results.data;
            })
        }

    // loads -cats on first digest cycle by calling the refreshCat function
    _refreshCats();

    // used to bind to $scope in controllers
    var _getCats = function () {
        return _cats;
    }

    var _makeCat = function (newCat) {
        //console.log("makeCat Service: [" + newCat + "].");
        return $http.post('api/account/createCategory', newCat)
        .then(function (response) {
            return response.data;
        })
    }
   
    var _selectCatSums = function () {
        console.log("in SelectCatSum")
        return $http.get('/api/account/getCatSums');
    }

    var _refreshCatSums = function () {
        _selectCatSums().then(function (results) {
            _catSums = results.data;
        })
    }

    _refreshCatSums();

    var _getCatSums = function () {
        return _catSums;
    }

    cateServiceFactory.refreshCats = _refreshCats;
    cateServiceFactory.getCats = _getCats;
    cateServiceFactory.makeCat = _makeCat;
    cateServiceFactory.getCatSums = _getCatSums;

    return cateServiceFactory;
}]);

