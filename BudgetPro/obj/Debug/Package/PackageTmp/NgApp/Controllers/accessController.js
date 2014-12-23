angular.module('app').controller('accessController', [ '$scope', 'authSvc', 'accountSvc', 'householdSvc','$state', '$stateParams','$modal', '$log',
    function ($scope, authSvc, accountSvc, householdSvc, $state, $stateParams, $modal, $log) {

        // set up scope values and objects
        $scope.getAuth = authSvc.getAuth;
        $scope.getUser = authSvc.getUser;
        $scope.invited = true;

        $scope.user = {
            Username: "",
            Name: "",
            Password: "",
            ConfirmPassword: "",
            Email: "",
            PhoneNumber: ""
        }
        $scope.usrLogin = { userName: $scope.user.Username, password: $scope.user.Password };


        // login functions
        $scope.login = function () {
            authSvc.login($scope.usrLogin).then(function () {
                $scope.invited = accountSvc.isInvitation();
                console.log('User has invitation: ' + $scope.invited);
                household = authSvc.getHousehold();
                //console.log('household: ' + household);
                if (household == '') {
                    $state.go('household');
                }
                else
                {
                    $state.go('home.dashboard');
                }   
            }, function () {
                //display error
            });
        }

        // logout functions
        $scope.logout = function () {
            $state.go('landing');
            authSvc.logOut();
        }

        // Registration functions
        $scope.register = function () {
            authSvc.register($scope.user).then(function () {
                $state.go('login');
            }, function () {
                alert("Registration failed.");
                $state.go('register');
            });
        }

    }]);
