/**
 * Created by LingZhang on 4/3/17.
 */
(function () {
    angular
        .module("ZipStory")
        .controller("LoginController", LoginController);
    function LoginController(userService, $location,$rootScope) {
        var vm = this;
        vm.login = login;
        function init() {
        }
        init();

        function login(user) {
            userService
                .login(user)
                .then(function (user) {
                    if (user) {
                        $rootScope.currentUser = user;
                        $location.url("/user/" + user._id)
                    }
                    else {
                        vm.error = "user not found, either username or password could be incorrect!"
                    }
                });

        }

    }
})();