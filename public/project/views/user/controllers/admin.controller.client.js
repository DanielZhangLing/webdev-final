/**
 * Created by LingZhang on 4/3/17.
 */
(function () {
    angular
        .module("ZipStory")
        .controller("AdminController", AdminController);
    function AdminController(userService, storyService, dealService, reviewService,$location, $rootScope) {
        var vm = this;
        vm.deleteUser = deleteUser;
        vm.deleteStory = deleteStory;
        vm.deleteDeal = deleteDeal;
        vm.deleteReview = deleteReview;
        vm.findAllUsers = findAllUsers;
        vm.findAllStories = findAllStories;
        vm.findAllDeals = findAllDeals;
        vm.findAllReviews = findAllReviews;

        function init() {
            findAllUsers();
            findAllStories();
            findAllDeals();
            findAllReviews();
        }

        function findAllUsers(){
            userService
                .findAllUsers()
                .then(function (users) {
                    if (users) {
                        vm.users = users;
                    }
                    else
                        vm.error = "Can't find user info, please try again!";
                })
        }

        function findAllStories(){
            storyService
                .findAllStories()
                .then(function (stories) {
                    if (stories) {
                        vm.stories = stories;
                    }
                    else
                        vm.error = "Can't find story info, please try again!";
                })
        }

        function findAllDeals(){
            dealService
                .findAllDeals()
                .then(function (deals) {
                    if (deals) {
                        vm.deals = deals;
                    }
                    else
                        vm.error = "Can't find deal info, please try again!"
                })
        }

        function findAllReviews(){
            reviewService
                .findAllReviews()
                .then(function (reviews) {
                    if (reviews) {
                        vm.reviews = reviews;
                    }
                    else
                        vm.error = "Can't find review info, please try again!"
                })
        }
        init();

        function deleteUser(userId) {
            console.log(userId);
            userService.deleteUser(userId)
                .then(function (user) {
                    if (user) {
                        findAllUsers();
                        vm.message = "delete success!"
                    }
                    else
                        vm.error = "delete failed!"
                })
        }

        function deleteStory(storyId,userId) {
            console.log(userId);
            storyService.deleteStory(storyId,userId)
                .then(function (story) {
                    if (story) {
                        findAllStories();
                        vm.message = "delete success!"
                    }
                    else
                        vm.error = "delete failed!"
                })
        }

        function deleteDeal(dealId,userId) {
            console.log(userId);
           dealService.deleteDeal(dealId,userId)
                .then(function (deal) {
                    if (deal) {
                        findAllDeals();
                        vm.message = "delete success!"
                    }
                    else
                        vm.error = "delete failed!"
                })
        }

        function deleteReview(reviewId,userId) {
            console.log(userId);
            reviewService.deleteReview(reviewId,userId)
                .then(function (review) {
                    if (review) {
                        findAllReviews();
                        vm.message = "delete success!"
                    }
                    else
                        vm.error = "delete failed!"
                })
        }

    }
})();