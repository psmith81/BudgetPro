angular.module('app').controller('catsController', ['$scope', '$state', 'categorySvc',
    function ($scope, $state, categorySvc) {

        $scope.selectedCat = "";
        $scope.newCatShow = true;
        $scope.newCatob = {
            id: null,
            householdId: null,
            name:""
            };

        $scope.getCats = categorySvc.getCats;

        $scope.makeCat = function (newCat) {
            console.log("In makeCat Controller: [" + newCat + "].");
            $scope.newCatob.name = newCat;
            categorySvc.makeCat($scope.newCatob).then(function () {
                categorySvc.refreshCats();
                $state.go('home.dashboard');
            })
        }
        
        $scope.getCatSums = categorySvc.getCatSums;

        //$scope.myCats().then(function (data) {
        //    $scope.categories = data;
        //    $scope.selectedCat = $scope.categories[0];
        //});

    }]);
