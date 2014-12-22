angular.module('app').controller('recentTransactionsController', ['$scope', '$state', '$stateParams', 'recentTrans',
    function ($scope, $state, $stateParams, recentTrans) {

        $scope.recentrans = recentTrans;

        $scope.transIsCol = false;

    }]);

