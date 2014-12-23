'use strict'
angular.module('app').factory('accountSvc', ['$http',  function ($http) {

    //var serviceBase = 'http://localhost:60335/';
    var accountSvcFactory = {};

    var _addAccount = function (newaccount) {
        //console.log('addAccount factory');
        return $http.post('/api/account/addAccount', newaccount)
        .then(function (response) {
            //console.log(response.data);
            return response.data;
        })
    }

    var _getAccountsByHousehold = function () {
        //console.log('getAccountsByHousehold');
        return $http.post('/api/account/getAccountsByHousehold')
        .then(function (response) {
            //console.log(response.data);
            return response.data;
        })
    }

    var _addTransaction = function (newtrans) {
        //console.log('addTransaction');
        //console.log(newtrans);
        return $http.post('/api/account/addTransaction', newtrans)
        .then(function (response) {
            //console.log(response.data)
            return response.data;
            })
    }

    var _getRecentTransByHousehold = function () {
        //console.log('getRecentTransByHousehold');
        return $http.post('/api/account/getRecentTransByHousehold')
        .then(function (response) {
            //console.log(response.data);
            return response.data;
        })
    }

    var _updateAcctBal = function (accId) {
        //console.log('Updating Balances for account: ' + accId); 
        return $http.post('/api/account/updateAccountBalances', accId);
        //.then(function (response) {
        //    console.log(response.data);
        //    return response.data;
        //})
    }

    var _newInvitation = function (invite) {
        return $http.post('/api/account/newInvitation', invite)
        .then(function (responce) {
            return responce.data;
        })
    }

    accountSvcFactory.addAccount = _addAccount;
    accountSvcFactory.getAccountsByHousehold = _getAccountsByHousehold;
    accountSvcFactory.addTransaction = _addTransaction;
    accountSvcFactory.getRecentTransByHousehold = _getRecentTransByHousehold;
    accountSvcFactory.updateAcctBal = _updateAcctBal;
    accountSvcFactory.newInvitation = _newInvitation;

    return accountSvcFactory;
}]);