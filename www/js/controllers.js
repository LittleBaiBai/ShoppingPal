angular.module('ShoppingPal.controllers', [])

        .controller('WishesCtrl', function ($scope, WishService) {
            $scope.wish_list = WishService.all();
        })

        .controller('ItemsCtrl', function ($scope, ItemService) {
            $scope.item_list = ItemService.all();
        })

        .controller('ItemDetailCtrl', function ($scope, $stateParams, ItemService) {
            $scope.item = ItemService.get($stateParams.itemId);
        })

        .controller('ShoppingsCtrl', function ($scope, ShoppingService) {
            $scope.shopping_list = ShoppingService.all();
            alert($scope.shopping_list.length);
        })

        .directive('shoppingCard', function () {
            return {
                restrict: "E",
                templateUrl: "templates/shopping-card.html",
                controller: function () {

                },
                controllerAs: "SCardCtrl"
            };
        })
        ;
