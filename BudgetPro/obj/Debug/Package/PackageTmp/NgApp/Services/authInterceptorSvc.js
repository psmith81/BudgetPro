'use strict';
angular.module('app').factory('authInterceptorSvc', ['$q', '$location', 'localStorageService', function ($q, $location, localStorageService) {

    var authInterceptiorServiceFactory = {};

    var _request = function (config) {
        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            //console.log(authData);
            config.headers.Authorization = 'Bearer ' + authData.token;
        }
        return config;
    }

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            $location.path('/login');
        }
        return $q.reject(rejection);
    }

    authInterceptiorServiceFactory.request = _request;
    authInterceptiorServiceFactory.responseError = _responseError;

    return authInterceptiorServiceFactory;
}]);