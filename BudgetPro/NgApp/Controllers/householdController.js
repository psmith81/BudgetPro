angular.module('app').controller('householdController', ['$scope', 'authSvc', 'householdSvc', 'accountSvc', 'categorySvc', '$state', '$stateParams', '$http',
    function ($scope, authSvc, householdSvc, accountSvc, categorySvc, $state, $stateParams, $http) {

        $scope.household = "";
        $scope.joinHousehold = false;

        $scope.invited = authSvc.getNotifications;
        
        $scope.getHoushold = householdSvc.getHousehold;

        $scope.createHousehold = function (Name) {
            householdSvc.createHousehold(Name).then(function () {
                authSvc.fillAuthData();
                $state.go('home.dashboard');
            })
        }

        $scope.getHoushold().then(function (data) {
            $scope.household = data != null ? data.name : null;
        });

        $scope.acceptHousehold = function (invite) {
            householdId = invite.householdId;
            //console.log(invite);
            //console.log('accept Household [' + householdId + ']');
            householdSvc.joinHousehold(householdId).then(function () {
                //console.log('Clear Invite: [' + invite.id + ']')
                accountSvc.clearInvitation(invite.id);
                authSvc.fillAuthData();
                $http.get('/api/account/GetInvitations')
                $state.go('home.dashboard');
            })
        }

    }]);