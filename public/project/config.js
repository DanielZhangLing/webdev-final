/**
 * Created by LingZhang on 3/25/17.
 */
/**
 * Created by LingZhang on 2/8/17.
 */
(function () {
    angular
        .module("ZipStory")
        .config(Config);
    function Config($routeProvider, $locationProvider) {
        // $locationProvider.hashPrefix('!');
        $routeProvider
            .when("/login", {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/error", {
                templateUrl: 'views/error/templates/error-authority.view.client.html',
                // controller: "LoginController",
                // controllerAs: "model"
            })
            .when("/", {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("default", {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/profile/:uid", {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/profile", {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/story/", {
                templateUrl: 'views/story/templates/story-list.view.client.html',
                controller: "StoryListController",
                controllerAs: "model"
            })
            .when("/story/:sid", {
                templateUrl: 'views/story/templates/story-detail.view.client.html',
                controller: "StoryDetailController",
                controllerAs: "model",
                resolve: {
                    currentUser: optionalCheckLogin
                }
            })
            .when("/spot/:pid/story", {
                templateUrl: 'views/story/templates/story-detail.view.client.html',
                // controller: "ProfileController",
                // controllerAs: "model"
            })
            .when("/user/:uid/story/new", {
                templateUrl: 'views/story/templates/story-add.view.client.html',
                // controller: "ProfileController",
                // controllerAs: "model"
            })
            .when("/spot/:pid/story/new", {
                templateUrl: 'views/story/templates/story-add.view.client.html',
                controller: "StoryAddController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/user/:uid/story/:sid", {
                templateUrl: 'views/story/templates/story-edit.view.client.html',
                controller: "StoryEditController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/user/:uid/deal/:did", {
                templateUrl: 'views/deal/templates/deal-edit.view.client.html',
                controller: "DealEditController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkMerchant
                }
            })
            .when("/deal/", {
                templateUrl: 'views/deal/templates/deal-list.view.client.html',
                controller: "DealListController",
                controllerAs: "model"
            })
            .when("/deal/:did", {
                templateUrl: 'views/deal/templates/deal-detail.view.client.html',
                controller: "DealDetailController",
                controllerAs: "model",
                resolve: {
                    currentUser: optionalCheckLogin
                }
            })
            .when("/spot/:pid/deal/new", {
                templateUrl: 'views/deal/templates/deal-add.view.client.html',
                controller: "DealAddController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkMerchant
                }
            })
            .when("/spot/", {
                templateUrl: 'views/spot/templates/spot-list.view.client.html',
                controller: "SpotListController",
                controllerAs: "model",
                resolve: {
                    currentUser: optionalCheckLogin
                }
            })
            .when("/spot/search/:headKeyword", {
                templateUrl: 'views/spot/templates/spot-list.view.client.html',
                controller: "SpotListController",
                controllerAs: "model",
                resolve: {
                    currentUser: optionalCheckLogin
                }
            })
            .when("/spot/:pid", {
                templateUrl: 'views/spot/templates/spot-detail.view.client.html',
                controller: "SpotDetailController",
                controllerAs: "model"
            })

        function checkMerchant($q, userService, $location) {
            var deferred = $q.defer();
            userService
                .isMerchant()
                .then(function (user) {
                    if (user != '0') {
                        deferred.resolve(user);
                    } else {
                        $location.url('/error');
                        deferred.reject();
                    }
                });
            return deferred.promise;
        }

        function checkLogin($q, userService, $location) {
            var deferred = $q.defer();
            userService
                .loggedIn()
                .then(function (user) {
                    if (user != '0') {
                        deferred.resolve(user);
                    } else {
                        $location.url('/login');
                        deferred.reject();
                    }
                });
            return deferred.promise;
        }

        function optionalCheckLogin($q, userService, $location) {
            var deferred = $q.defer();
            userService
                .loggedIn()
                .then(function (user) {
                    if (user != '0') {
                        deferred.resolve(user);
                    } else {
                        deferred.resolve(null);
                    }
                });
            return deferred.promise;
        }
    }
})();