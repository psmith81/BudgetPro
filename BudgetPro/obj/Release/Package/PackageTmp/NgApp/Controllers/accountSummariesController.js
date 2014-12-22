angular.module('app').controller('accountSummariesController', ['$scope', '$state', '$stateParams', 'houseAccts',
    function ($scope,$state, $stateParams, houseAccts) {
        $scope.houseaccts = houseAccts;
        $scope.acctIsCol = false;
    }]);

