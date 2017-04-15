/**
 * Created by LingZhang on 4/7/17.
 */
(function () {
    angular
        .module("ZipStory")
        .controller("DealDetailController", DealDetailController);
    function DealDetailController(reviewService, currentUser, $sce, dealService, userService, $routeParams, $location) {
        var vm = this;
        vm.user = currentUser;
        vm.dealId = $routeParams["did"];
        vm.liked = false;
        vm.bought = false;
        vm.getTrustedHtml = getTrustedHtml;
        vm.likeDeal = likeDeal;
        vm.dislikeDeal = dislikeDeal;
        vm.createReview = createReview;
        vm.buyDeal = buyDeal;
        vm.cancelDeal = cancelDeal;
        vm.getTimes = getTimes;
        vm.getAvgRate = getAvgRate;
        vm.reviewUrl = $location.absUrl() + '#add-deal-reviews-form';

        function init() {
            dealService
                .findDealById(vm.dealId)
                .then(function (deal) {
                    if (deal) {
                        vm.deal = deal;
                        for (i in deal.likeUser)
                            if (vm.user && deal.likeUser[i] == vm.user._id)
                                vm.liked = true;
                        vm.likes = deal.likeUser.length;
                        vm.sales = deal.buyUser.length;
                        if (vm.user) {
                            for (i in deal.likeUser) {
                                if (vm.user._id == deal.likeUser[i])
                                    vm.liked = true;
                            }
                            for (i in deal.buyUser) {
                                if (vm.user._id == deal.buyUser[i])
                                    vm.bought = true;
                            }
                        }
                        reviewService
                            .findReviewByDeal(vm.dealId)
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
                        vm.error = "can't find select deal, please try again!"
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
                review["deal"] = vm.dealId;
                console.log(review)
                reviewService
                    .createReview(review)
                    .then(function (review) {
                        if (review) {
                            vm.message = "adding review successfully!";
                            reviewService
                                .findReviewByDeal(vm.dealId)
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

        function likeDeal() {
            if (!vm.user)
                $location.url('/login');
            else {
                console.log("1");
                dealService
                    .likeDeal(vm.dealId, vm.user._id)
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

        function buyDeal() {
            if (!vm.user)
                $location.url('/login');
            else {
                console.log("1");
                dealService
                    .buyDeal(vm.dealId, vm.user._id)
                    .then(function (data) {
                        if (data) {
                            console.log(data)
                            vm.sales = data.buyUser.length;
                            vm.bought = true;
                        } else {
                            vm.error = "adding failed, please try again!"
                        }
                    })
            }
        }

        function dislikeDeal() {
            if (!vm.user)
                $location.url('/login');
            else {
                dealService
                    .dislikeDeal(vm.dealId, vm.user._id)
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

        function cancelDeal() {
            if (!vm.user)
                $location.url('/login');
            else {
                dealService
                    .cancelDeal(vm.dealId, vm.user._id)
                    .then(function (data) {
                        if (data) {
                            vm.sales = data.buyUser.length;
                            vm.bought = false;
                        } else {
                            vm.error = "cancelling failed, please try again!"
                        }
                    })
            }
        }
    }
})();
