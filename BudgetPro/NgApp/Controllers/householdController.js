angular.module('app').controller('householdController', ['$scope', 'authSvc', 'householdSvc', '$state', '$stateParams',
    function ($scope, authSvc, householdSvc, $state, $stateParams) {

        $scope.household = "";
        $scope.joinHousehold = false;
        
        $scope.getHoushold = householdSvc.getHousehold;
        //$scope.createHousehold = householdSvc.createHousehold;

        $scope.createHousehold = function (Name) {
            householdSvc.createHousehold(Name).then(function () {
                authSvc.logOut();
                $state.go('login');
            })
        }

        $scope.getHoushold().then(function (data) {
            $scope.household = data != null ? data.name : null;
        });
    }]);