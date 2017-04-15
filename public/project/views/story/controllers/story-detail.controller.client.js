/**
 * Created by LingZhang on 4/7/17.
 */
(function () {
    angular
        .module("ZipStory")
        .controller("StoryDetailController", StoryDetailController);
    function StoryDetailController(reviewService, currentUser, $sce, storyService, userService, $routeParams, $location) {
        var vm = this;
        vm.user = currentUser;
        vm.storyId = $routeParams["sid"];
        vm.liked = false;
        vm.getTrustedHtml = getTrustedHtml;
        vm.likeStory = likeStory;
        vm.dislikeStory = dislikeStory;
        vm.createReview = createReview;
        vm.getTimes = getTimes;
        vm.getAvgRate = getAvgRate;
        vm.reviewUrl = $location.absUrl() + '#add-story-reviews-form';

        function init() {

            storyService
                .findStoryById(vm.storyId)
                .then(function (story) {
                    if (story) {
                        vm.story = story;
                        for (i in story.likeUser)
                            if (vm.user && story.likeUser[i] == vm.user._id)
                                vm.liked = true;
                        vm.likes = story.likeUser.length;
                        if (vm.user) {
                            for (i in story.likeUser) {
                                if (vm.user._id == story.likeUser[i])
                                    vm.liked = true;
                            }
                        }
                        reviewService
                            .findReviewByStory(vm.storyId)
                            .then(function (reviews) {
                                if (reviews) {
                                    vm.reviews = reviews;
                                    getAvgRate();
                                }
                                else {
                                    vm.error = "can't find select reviews, please try again!"
                                }
                            })
                    }
                    else {
                        vm.error = "can't find select story, please try again!"
                    }
                });

        }

        init();

        function getAvgRate() {
            var sum = 0;
            for (i in vm.reviews)
                sum = sum + vm.reviews[i].rate;
            vm.avgRate = sum / vm.reviews.length;
        }

        function getTimes(times) {
            return new Array(times);
        }

        function createReview(review) {
            if (!vm.user)
                $location.url("/login");
            else {
                review["author"] = vm.user._id;
                review["authorName"] = vm.user.username;
                review["story"] = vm.storyId;
                console.log(review)
                reviewService
                    .createReview(review)
                    .then(function (review) {
                        if (review) {
                            vm.message = "adding review successfully!"
                            reviewService
                                .findReviewByStory(vm.storyId)
                                .then(function (reviews) {
                                    if (reviews) {
                                        vm.reviews = reviews;
                                        getAvgRate();
                                    }
                                    else {
                                        vm.error = "can't find select reviews, please try again!"
                                    }
                                })
                        }
                        else
                            vm.error = "adding review failed!"
                    })
            }
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function likeStory() {
            if (!vm.user)
                $location.url('/login');
            else {
                console.log("1");
                storyService
                    .likeStory(vm.storyId, vm.user._id)
                    .then(function (data) {
                        if (data) {
                            console.log(data)
                            vm.likes = data.likeUser.length;
                            vm.liked = true;
                        } else {
                            vm.error = "adding failed, please try again!"
                        }
                    })
            }
        }

        function dislikeStory() {
            if (!vm.user)
                $location.url('/login');
            else {
                storyService
                    .dislikeStory(vm.storyId, vm.user._id)
                    .then(function (data) {
                        if (data) {
                            vm.likes = data.likeUser.length;
                            vm.liked = false;
                        } else {
                            vm.error = "cancelling failed, please try again!"
                        }
                    })
            }
        }
    }
})();