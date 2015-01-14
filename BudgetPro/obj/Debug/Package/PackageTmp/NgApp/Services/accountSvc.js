'use strict'
angular.module('app').factory('accountSvc', ['$http',  function ($http) {

    var accountSvcFactory = {};

    accountSvcFactory.acctTrans = {};


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

    var _isInvitation = function () {
        return $http.post('/api/account/isInvitation')
        .then(function (response) {
            console.log(response);
            return response.data.value;
        })
        
    }

    var _newInvitation = function (invite) {
        return $http.post('/api/account/newInvitation', invite)
        .then(function (response) {
            return response.data;
        })
    }

    var _clearInvitation = function (inviteId) {
        return $http.post('/api/account/clearInvitation', inviteId)
        .then(function (response) {
            return response.data;
        })
    }

    var _getAccount = function (acctId) {
        return $http.post('/api/account/getAccount', acctId)
        .then(function (response) {
            console.log(response.data);
            return response.data;
        })
    }

    var _getAcctTransCount = function (acctId) {
        return $http.post('/api/account/getAcctTransCount', acctId)
        .then(function (response) {
            console.log(response.data);
            return response.data;
        })
    }

    //Account Transactions:
    var _selectAcctTransactions = function (aTParams) {
        console.log("In getAcctTransactions with: ");
        console.log(aTParams);
        return $http.post('/api/account/getAcctTransactions', aTParams)
    }

    var _refreshAcctTransactions = function (aTParams) {
        _selectAcctTransactions(aTParams).then(function (results) {
            console.log("In refreshAcctTransactions with: ");
            console.log(results.data);
            accountSvcFactory.acctTrans = results.data;
        })
    }

    //_refreshAcctTransactions(aTParams);

    var _getAcctTransactions = function () {
        console.log("getting acctTrans [" + accountSvcFactory.acctTrans + "]");
        return accountSvcFactory.acctTrans;
    }

    accountSvcFactory.addAccount = _addAccount;
    accountSvcFactory.getAccountsByHousehold = _getAccountsByHousehold;
    accountSvcFactory.addTransaction = _addTransaction;
    accountSvcFactory.getRecentTransByHousehold = _getRecentTransByHousehold;
    accountSvcFactory.updateAcctBal = _updateAcctBal;
    accountSvcFactory.isInvitation = _isInvitation;
    accountSvcFactory.newInvitation = _newInvitation;
    accountSvcFactory.clearInvitation = _clearInvitation;
    accountSvcFactory.getAccount = _getAccount;
    accountSvcFactory.getAcctTransCount = _getAcctTransCount;
    accountSvcFactory.getAcctTransactions = _getAcctTransactions;
    accountSvcFactory.refreshAcctTransactions = _refreshAcctTransactions;

    return accountSvcFactory;
}]);