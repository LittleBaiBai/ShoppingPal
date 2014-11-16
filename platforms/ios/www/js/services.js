angular.module('ShoppingPal.services', [])

        .factory('ItemService', function () {
            var items = [];
            var index = 0;
            return {
                init: function () {
                    items = JSON.parse(window.localStorage['savedItems'] || '{}');
                    index = window.localStorage['itemIndex'] || 0;
                },
                all: function () {
                    console.log("get all items: " + items);
                    return items;
                },
                get: function (itemId) {
                    return items[itemId];
                },
                add: function (obj) {
                    items.push(obj);
                    index++;
                    window.localStorage['savedItems'] = JSON.stringify(items);
                    window.localStorage['itemIndex'] = index;
                },
                del: function (index) {
                    items.splice(index, 1);
                    window.localStorage['savedItems'] = JSON.stringify(items);
                },
                getIndex: function () {
                    return index;
                }
            };
        })

        .factory('WishService', function () {
            var wishes = [];
            var index = 0;
            return {
                init: function () {
                    wishes = JSON.parse(window.localStorage['savedWishes'] || '[]');
                    //wishes = [];
                    index = window.localStorage['wishIndex'] || 0;
                },
                all: function () {
                    console.log("get all wishes: " + wishes);
                    return wishes;
                },
                get: function (wishId) {
                    console.log("get wishId=" + wishId + ": " + wishes[wishId]);
                    return wishes[wishId];
                },
                add: function (obj) {
                    console.log(obj);
                    wishes.push(obj);
                    index++;
                    window.localStorage['savedWishes'] = JSON.stringify(wishes);
                    window.localStorage['wishIndex'] = index;
                    console.log("Wish added: " + wishes);
                },
                del: function (index) {
                    wishes.splice(index, 1);
                    window.localStorage['savedWishes'] = JSON.stringify(wishes);
                    console.log("Wish deleted: " + wishes);
                },
                getIndex: function () {
                    return index;
                }
            };
        })

        .factory('ShoppingService', function () {
            var shoppings = [];
            var index = 0;
            return {
                init: function () {
                    shoppings = JSON.parse(window.localStorage['savedShoppings'] || '[]');
                    index = window.localStorage['shoppingIndex'] || 0;
                },
                all: function () {
                    console.log("get all shoppings: " + shoppings);
                    return shoppings;
                },
                get: function (shoppingId) {
                    console.log("return shoppingID=" + shoppingId + ": " + shoppings[shoppingId]);
                    return shoppings[shoppingId];
                },
                add: function (obj) {
                    console.log("shopping added: " + shoppings);
                    shoppings.splice(0, 0, obj);
                    console.log("shopping added: " + shoppings);
                    index++;
                    console.log("shopping added: " + shoppings);
                    window.localStorage['savedShoppings'] = JSON.stringify(shoppings);
                    console.log("shopping added: " + shoppings);
                    window.localStorage['shoppingIndex'] = index;
                    console.log("shopping added: " + shoppings);
                },
                del: function (index) {
                    shoppings.splice(index, 1);
                    window.localStorage['savedShoppings'] = JSON.stringify(shoppings);
                    console.log("shopping deleted: " + shoppings);
                },
                getIndex: function () {
                    return index;
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
