angular.module('app').controller('catsController', ['$scope', 'categorySvc',
    function ($scope, categorySvc) {

        $scope.testit = "This is a test!"
        $scope.status = {
            isopen: false
        };
        $scope.selectedCat = "";

        $scope.myCats = categorySvc.getCats;

        $scope.myCats().then(function (data) {
            $scope.categories = data;
            $scope.selectedCat = $scope.categories[0];
        });

    }]);
