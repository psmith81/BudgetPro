'use strict';
angular.module('app').factory('authSvc', ['$http', '$q', 'localStorageService', '$interval', function ($http, $q, localStorageService, $interval) {

    var notificationInterval;
    var notificationIntervalTick = 60000;  // 300000 = five minutes

    //var serviceBase = 'http://localhost:60335/';
    var authServiceFactory = {};
    
    var _authentication = {
        isAuth: false,
        userId: null,
        householdId: null,
        username: "",
        name: "",
        token: "",
        claims: {}
    };

    //var _getUserInfo = function () {
    //    console.log('in getUserInfo');
    //    var authData = localStorageService.get('authorizationData');
    //    if (authData != null)
    //        var rst = authData.userId;
    //    else
    //        var rst = "";
    //    var userId = rst;
    //    //console.log(userId);
    //    return $http.post('/api/authentication/selectUser', userId).then(function (response) {
    //        //console.log(response.data);
    //        return response.data;
    //    });
    //}

    var _register = function (registration) {
        _logOut();
        return $http.post('/api/authentication/register', registration).then(function (response) {
            return response;
        });
    };

    var _deserializeClaims = function (claimsString) {
        var claimsArray = eval(claimsString);
        var claimsDict = {};
        for (var i = 0; i < claimsArray.length; i++) {
            if (typeof claimsDict[claimsArray.ClaimType] === 'undefined')
                claimsDict[claimsArray[i].ClaimType] = [];
            claimsDict[claimsArray[i].ClaimType].push(claimsArray[i].ClaimValue);
        }
        return claimsDict;
    }

    var _login = function (loginData) {
        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
        var deferred = $q.defer();
        $http.post('/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
            .success(function (response) {
                var claims = _deserializeClaims(response.claims);
                _authentication.userId = response.userId;
                _authentication.householdId = response.householdId;
                _authentication.isAuth = true;
                _authentication.username = claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'][0];
                _authentication.name = claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'][0];
                _authentication.claims = claims;
                _authentication.token = response.access_token;

                localStorageService.set('authorizationData', _authentication);

                //get notifications manually o load
                $http.get('/api/account/GetInvitations').then(function (response) {
                    _authentication.notifications = response.data;
                    
                });
                notificationInterval = $interval(function () {
                    //check for invitations
                        $http.get('/api/account/GetInvitations').then(function (response) {
                            _authentication.notifications = response.data;
                            
                        });
                }, notificationIntervalTick);

                deferred.resolve(response);
            })
            .error(function (err, status) {
                _logOut();
                deferred.reject(err);
            });

        return deferred.promise;
    };

    var _logOut = function() {
        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.username = "";
        _authentication.name = "";
        _authentication.claims = null;
        _authentication.token = "";
        _authentication.notifications = null;
        userId: null;
        householdId: null;
        $interval.cancel(notificationInterval);
    };

    var _fillAuthData = function () {
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.username = authData.claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'][0] || "";
            _authentication.name = authData.claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'][0] || "";
            _authentication.claims = authData.claims;
            _authentication.token = authData.token;
            _authentication.userId = authData.userId;
            _authentication.email = authData.email;
            _authentication.phoneNumber = authData.phoneNumber;
            _authentication.householdId = authData.householdId;

            //get notifications manually on load
            $http.get('/api/account/GetInvitations').then(function (response) {
                _authentication.notifications = response.data;
            });
            notificationInterval = $interval(function () {
                //check for invitations
                    $http.get('/api/account/GetInvitations').then(function (response) {
                        _authentication.notifications = response.data;
                        console.log(response.data);
                    });
            }, notificationIntervalTick);
        }
    };

    var _getAuth = function () {
        var authData = localStorageService.get('authorizationData');
        if (authData != null)
            var rst = authData.isAuth;
        else
            var rst = false;
        
        return rst;
    };

    var _getUser = function () {
        var authData = localStorageService.get('authorizationData');
        if (authData != null)
            var rst = authData.name;
        else
            var rst = "";

        return rst;
    }

    var _getHousehold = function () {
        var authData = localStorageService.get('authorizationData');
        if (authData != null)
            var rst = authData.householdId;
        else
            var rst = "";

        return rst;
    }
    
    var _getUserId = function () {
        var authData = localStorageService.get('authorizationData');
        if (authData != null)
            var rst = authData.userId;
        else
            var rst = "";

        return rst;
    }

    var _getUserInfo = function () {
        console.log('in getUserInfo');
        return $http.post('/api/authentication/getUserInfo').then(function (response) {
            console.log(response.data);
            return response.data;
        });
    }

    var _getNotifications = function () {
        return _authentication.notifications;
    }
    
    
    authServiceFactory.register = _register;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.getAuth = _getAuth;
    authServiceFactory.getUser = _getUser;
    authServiceFactory.getHousehold = _getHousehold;
    authServiceFactory.getUserId = _getUserId;
    authServiceFactory.getUserInfo = _getUserInfo;
    authServiceFactory.getNotifications = _getNotifications;



    return authServiceFactory;
}]);
