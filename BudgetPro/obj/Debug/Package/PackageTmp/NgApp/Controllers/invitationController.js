angular.module('app').controller('invitationController', ['$scope', 'authSvc', 'accountSvc', '$state', '$stateParams',
    function ($scope, authSvc, accountSvc, $state, $stateParams) {

        $scope.invitation = {
            Id: null,
            FromUserId: null,
            ToEmail: "joe"
        };

        $scope.newInvite = function () {
            console.log('found my way the newInvitation fuction')
            $scope.invitation.FromUserId = authSvc.getUserId();
            accountSvc.newInvitation($scope.invitation).then(function () {
                $state.go('home.dashboard');
            })

        }

    }]);