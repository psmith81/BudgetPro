angular.module('app').controller('demoController', ['$scope', 'authSvc', '$state', '$stateParams', /*newBudgetItem*/
    function ($scope, authSvc, $state, $stateParams) {
  
        var _demoLogin = { userName: "psmith", password: "Password-1" };

        // login functions
        $scope.demoLogin = function () {
            authSvc.login(_demoLogin).then(function () {
                $state.go('home.dashboard');
            });
        }

    }])