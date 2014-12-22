angular.module('app').directive('acctSumDirective', [function () {
    return {
        restrict: 'AEC',
        scope: {
            selectedAcct: '=acct'
        },
        link: function ($scope, elem, attrs) {

        }

    }
}])