/**
 * Created by LingZhang on 4/3/17.
 */
(function () {
    angular
        .module("ZipStory")
        .controller("RegisterController", RegisterController);
    function RegisterController(userService, $location, $timeout) {
        var vm = this;
        vm.register = register;

        function register(user) {
            console.log(user);
            userService
                .register(user)
                .then(function (user) {
                        if (user.type == "ADMIN")
                            $location.url('/admin');
                        else
                            $location.url('profile');
                    },
                    function (err) {
                        if (err) {
                            vm.error = "The username is already taken";
                        }
                    });
        }
    }

    // function register(user) {
    //     userService
    //         .register(user.username)
    //         .success(function (oldUser) {
    //             vm.error = "The username is already taken";
    //         })
    //         .error(function (err) {
    //             UserService.createUser(user)
    //                 .success(function (newUser) {
    //                     $location.url("/profile/" + newUser._id);
    //                 })
    //                 .error(function(){
    //                     vm.error = "Unknown Error"
    //                 });
    //         });
    //
    // }
    // }
})();