angular.module('ShoppingPal.controllers', [])

        .controller('WishesCtrl', function ($scope, WishService) {
            $scope.wish_list = WishService.all();
//            $scope.check_list = wish_list;
//            $scope.data = {
//                showDelete: false,
//                showReorder: true
//            };
//
//            $scope.moveWish = function (wish, fromIndex, toIndex) {
//                $scope.wish_list.splice(fromIndex, 1);
//                $scope.wish_list.splice(toIndex, 0, wish);
//            };

            $scope.deleteWishes = function (wish) {
                for (wish in $scope.wish_list) {
                    WishService.delete($scope.wishes_list.indexOf(wish));
                    $scope.wishes_list.splice($scope.wishes_list.indexOf(wish), 1);
                    //$scope.$apply();
                }
            };

            $scope.goAddWish = function () {
                var wish = {};
                wish.title = prompt("Please enter new wish", "Title");
                wish.id = $scope.wish_list[$scope.wish_list.length - 1].id + 1;
                WishService.add(wish);
                $scope.wish_list = WishService.all();
                //$scope.$apply();
            };
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

        .controller('AddShoppingCtrl', function ($scope, $state, $ionicActionSheet, $ionicViewService, $ionicLoading, WishService, ShoppingService, Camera) {
            //$scope.currentLocation = '(Locating...)';
            $scope.data = [];
            $scope.wish_list = WishService.all();

            $scope.saveShopping = function () {
                $ionicLoading.show({
                    template: 'Creating Client...'
                });
                Camera.convertImgToBase64($scope.data, $scope.data.receipt, function (processedClient, base64Img) {
                    processedClient.receipt = base64Img;
                    ShoppingService.add(processedClient);
                    $ionicLoading.hide();
                    var backView = $ionicViewService.getBackView();
                    backView && backView.go();
                });
                //ShoppingService.add($scope.data);

            };

            $scope.getGeoLocation = function () {
                navigator.geolocation.getCurrentPosition(onSuccess, onError);
            };
            function onSuccess(position) {
                var currentLocation =
                        'Latitude: ' + position.coords.latitude + '\n' +
                        'Longitude: ' + position.coords.longitude + '\n' +
                        'Altitude: ' + position.coords.altitude + '\n';

                var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                console.log("currentLocation = " + currentLocation);
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'latLng': currentLocation}, function (results, status) {
                    if (status === 'OK') {
                        //console.log("in OK");
                        $scope.currentLocation = results[0].formatted_address;
                        console.log("currentLocation = " + $scope.currentLocation);
                    }
                    else {
                        $scope.currentLocation = "Not Found!";
                        alert("Something wrong with your location");
                        console.log("status: " + status);
                    }
                    $scope.data.location = $scope.currentLocation;
                    $scope.$apply();
                });
            }
            ;
            function onError(error) {
                $scope.currentLocation = "No location information";
                $scope.data.location = $scope.currentLocation;
                $scope.$apply();
                alert('Please enable your geolocation service to keep track of your shopping location!');
                console.log('message: ' + error.message + '\n');
            }

            $scope.pickReceiptPic = function () {
                // Show the action sheet
                var hideSheet = $ionicActionSheet.show({
                    buttons: [
                        {text: 'Take Photo'},
                        {text: 'Choose Existing Photo'}
                    ],
                    cancelText: 'Cancel',
                    cancel: function () {
                        hideSheet();
                    },
                    buttonClicked: function (index) {
                        if (index === 0) {
                            hideSheet();
                            //alert("take Photo");
                            Camera.getPicture().then(function (imagePath) {
                                console.log("in taking photo - imagePath = " + imagePath);
                                $scope.picPath = imagePath;
                                $scope.$apply();
                                $scope.data.receipt = $scope.picPath;
                            }, function (err) {
                                alert(err);
                            });
                        } else if (index === 1) {
                            hideSheet();
                            //alert("album");
                            Camera.getFromAlbum().then(function (imagePath) {
                                console.log("in get from album - imagePath = " + imagePath);
                                $scope.picPath = imagePath;
                                $scope.$apply();

                                $scope.data.receipt = $scope.picPath;
                                //alert($scope.client.profile_pic);

                            }, function (err) {
                                alert(err);
                            });
                        }
                        return true;
                    }
                });

            };

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
