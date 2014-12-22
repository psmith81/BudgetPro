angular.module('app').controller('aboutController', ['$scope', 'authSvc', 'householdSvc', '$state', '$stateParams',
    function ($scope, authSvc, householdSvc, $state, $stateParams) {

        $scope.household = "";
        $scope.joinHousehold = true;
        $scope.test = "This is a test!"


        $scope.getHoushold = householdSvc.getHousehold;
        $scope.createHousehold = householdSvc.createHousehold;

        $scope.getHoushold().then(function (data) {
            $scope.household = data != null ? data.name : null;
        });
    }]);