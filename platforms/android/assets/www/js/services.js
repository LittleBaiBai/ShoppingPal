angular.module('ShoppingPal.services', [])

        .factory('ItemService', function () {
            var items = [
                {id: 0, title: 'Scruff McGruff'},
                {id: 1, title: 'G.I. Joe'},
                {id: 2, title: 'Miss Frizzle'},
                {id: 3, title: 'Ash Ketchum'}
            ];

            return {
                all: function () {
                    return items;
                },
                get: function (itemId) {
                    return items[itemId];
                }
            }
        })

        .factory('WishService', function () {
            var wishes = [
                {id: 0, title: 'book'},
                {id: 1, title: 'food'}
            ];
            
            return {
                all: function () {
                    return wishes;
                },
                get: function (wishId) {
                    return wishes[wishId];
                }
            }
        })

        .factory('ShoppingService', function () {
            var shoppings = [
                {id: 0, title: 'book', brand: 'BWS', date: '2014-09-18', amount: 34, location: '(123,124)', receipt: 'ionic.png'},
                {id: 1, title: 'food', brand: 'Coles', date: '2014-11-09', amount: 65, location: '(123,124)', receipt: 'ionic.png'}
            ];
            
            return {
                all: function () {
                    return shoppings;
                },
                get: function (shoppingId) {
                    return shoppings[shoppingId];
                }
            }
        })
        ;
