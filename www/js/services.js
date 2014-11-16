angular.module('ShoppingPal.services', [])

        .factory('ItemService', function () {
            var items = JSON.parse(window.localStorage['savedItems'] || '{}');

            return {
                all: function () {
                    return items;
                },
                get: function (itemId) {
                    return items[itemId];
                },
                add: function (obj) {
                    items.push(obj);
                    window.localStorage['savedItems'] = JSON.stringify(items);
                },
                del: function (index) {
                    items.splice(index, 1);
                    window.localStorage['savedItems'] = JSON.stringify(items);
                }
            };
        })

        .factory('WishService', function () {
            var wishes = JSON.parse(window.localStorage['savedWishes'] || '{}');
            
            return {
                all: function () {
                    return wishes;
                },
                get: function (wishId) {
                    return wishes[wishId];
                },
                add: function (obj) {
                    wishes.push(obj);
                    window.localStorage['savedWishes'] = JSON.stringify(wishes);
                },
                del: function (index) {
                    wishes.splice(index, 1);
                    window.localStorage['savedWishes'] = JSON.stringify(wishes);
                }
            };
        })

        .factory('ShoppingService', function () {
            var shoppings = JSON.parse(window.localStorage['savedShoppings'] || '{}');

            return {
                all: function () {
                    return shoppings;
                },
                get: function (shoppingId) {
                    return shoppings[shoppingId];
                },
                add: function (obj) {
                    shoppings.push(obj);
                    window.localStorage['savedShoppings'] = JSON.stringify(shoppings);
                },
                del: function (index) {
                    shoppings.splice(index, 1);
                    window.localStorage['savedShoppings'] = JSON.stringify(shoppings);
                }
            };
        })

        .factory('Camera', ['$q', function ($q) {

                var cleanUp = function () {
                    var deferred = $q.defer();
                    if (navigator && navigator.camera) {
                        navigator.camera.cleanup(
                                function onSuccess() {
                                    console.log("Camera cleanup success.");
                                },
                                function onFail(message) {
                                    alert('Failed because: ' + message);
                                });
                    } else {
                        alert("Bummer.  No camera!");
                        deferred.reject("Bummer.  No camera!");
                    }
                    return deferred.promise;
                };

                var getPicture = function (options) {
                    var deferred = $q.defer();
                    var cameraOptions = {
                        quality: 80,
                        destinationType: Camera.DestinationType.FILE_URI,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        targetWidth: 512,
                        targetHeight: 512,
                        allowEdit: true,
                        encodingType: Camera.EncodingType.JPEG,
                        popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY),
                        saveToPhotoAlbum: true};
                    if (navigator && navigator.camera) {
                        navigator.camera.getPicture(
                                function (result) {
                                    // Do any magic you need
                                    deferred.resolve(result);
                                },
                                function (err) {
                                    deferred.reject(err);
                                }, cameraOptions);
                    } else {
                        alert("Bummer.  No camera!");
                        deferred.reject("Bummer.  No camera!");
                    }

                    return deferred.promise;
                };
                var getFromAlbum = function (options) {
                    var deferred = $q.defer();
                    var cameraOptions = {
                        quality: 80,
                        destinationType: Camera.DestinationType.FILE_URI,
                        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                        targetWidth: 512,
                        targetHeight: 512,
                        allowEdit: true,
                        encodingType: Camera.EncodingType.JPEG,
                        popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY),
                        saveToPhotoAlbum: false};
                    if (navigator && navigator.camera) {
                        navigator.camera.getPicture(
                                function (result) {
                                    // Do any magic you need
                                    deferred.resolve(result);
                                },
                                function (err) {
                                    deferred.reject(err);
                                },
                                cameraOptions);
                    } else {
                        alert("Bummer.  No camera!");
                        deferred.reject("Bummer.  No camera!");
                    }
                    return deferred.promise;
                };

                var convertImgToBase64 = function (client, url, callback, outputFormat) {
                    var canvas = document.createElement('CANVAS');
                    var ctx = canvas.getContext('2d');
                    var img = new Image;
                    img.crossOrigin = 'Anonymous';
                    img.onload = function () {
                        canvas.height = img.height;
                        canvas.width = img.width;
                        ctx.drawImage(img, 0, 0);
                        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
                        callback.call(this, client, dataURL);
                        // Clean up
                        canvas = null;
                    };
                    img.src = url;
                };

                return {
                    cleanUp: cleanUp,
                    getPicture: getPicture,
                    getFromAlbum: getFromAlbum,
                    convertImgToBase64: convertImgToBase64
                };
            }])

        ;
