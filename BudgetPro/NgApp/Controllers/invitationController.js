angular.module('app').controller('invitationController', ['$http', '$scope', 'authSvc', 'accountSvc', 'householdSvc', '$state', '$stateParams',
    function ($http, $scope, authSvc, accountSvc, householdSvc, $state, $stateParams) {

        $scope.invitation = {
            Id: null,
            FromUserName: "",
            UserHouse: ""
        };
        $scope.notices = authSvc.getNotifications;

        $scope.newInvite = function () {
            //console.log('found my way the newInvitation fuction')
            $scope.invitation.FromUserId = authSvc.getUserId();
            accountSvc.newInvitation($scope.invitation).then(function () {
                $state.go('home.dashboard');
            })
        }

        $scope.acceptInvite = function (invite) {
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

        $scope.declineInvite = function (invite) {
            accountSvc.clearInvitation(invite.id);
            $http.get('/api/account/GetInvitations')

        }


        //$scope.notice = function () {
        //    console.log('Notice Controller');
        //    console.log(authSvc.authentication.notifications);
            
        //    if (authSvc.authentication.notifications.length > 0) {
        //        $scope.notice = true;
        //    } else {
        //        $scope.notice = false;
        //    }
        //    console.log('Leaving Notice Controller');
        //}
    }]);