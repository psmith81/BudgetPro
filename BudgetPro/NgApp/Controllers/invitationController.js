angular.module('app').controller('invitationController', ['$scope', 'authSvc', 'accountSvc', '$state', '$stateParams',
    function ($scope, authSvc, accountSvc, $state, $stateParams) {

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