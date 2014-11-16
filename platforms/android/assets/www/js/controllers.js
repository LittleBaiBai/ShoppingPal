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

        .controller('ShoppingsCtrl', function ($scope, $state, ShoppingService) {
            $scope.shopping_list = ShoppingService.all();
            $scope.goAddShopping = function () {
                $state.go("tab.addShopping");
            };
        })

        .controller('AddShoppingCtrl', function ($scope, $state, WishService, ShoppingService) {
            $scope.currentLocation = '(Locating...)';
            $scope.data = [];
            $scope.wish_list = WishService.all();
            $scope.getGeoLocation = function () {
                navigator.geolocation.getCurrentPosition(onSuccess, onError);
            }
            
            var onSuccess = function (position) {
                var currentLocation =
                        'Latitude: ' + position.coords.latitude + '\n' +
                        'Longitude: ' + position.coords.longitude + '\n' +
                        'Altitude: ' + position.coords.altitude + '\n';

                var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                console.log("currentLocation = " + currentLocation);
                $scope.location = currentLocation;
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'latLng': currentLocation}, function (results, status) {
                    if (status === 'OK') {
                        console.log("in OK");
                        $scope.currentLocation = "You are in " + results[0].formatted_address;
                        console.log("currentLocation = " + $scope.currentLocation);
                    }
                    else {
                        $scope.currentLocation = "Not Found!";
                        $scope.location = "No location information";
                        alert("Something wrong with your location");
                        console.log("status: " + status);
                    }
                });
            };
            function onError(error) {
                $scope.location = "No location information";
                alert('Please enable your geolocation service to keep track of your shopping location!');
                console.log('message: ' + error.message + '\n');
            }

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
