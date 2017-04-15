/**
 * Created by LingZhang on 4/12/17.
 */
module.exports = function () {

    var api = {
        // createUser: createUser,
        // findUserByCredentials: findUserByCredentials,
        createReview: createReview,
        findReviewByStory: findReviewByStory,
        findReviewByDeal: findReviewByDeal,
        findReviewsByUser: findReviewsByUser,
        deleteReview: deleteReview,
        deleteUserReview: deleteUserReview,
        findAllReviews: findAllReviews,

    };

    var q = require("q");
    var mongoose = require('mongoose');
    var reviewSchema = require('./review.schema.server')();
    var ReviewModel = mongoose.model('ReviewModel', reviewSchema);

    return api;


    function findAllReviews() {
        var d = q.defer();
        ReviewModel
            .find(function (err, reviews) {
                if (err) {
                    d.abort(err);
                } else {
                    d.resolve(reviews);
                }
            }).sort({dateCreated: -1});
        return d.promise;
    }

    function deleteReview(reviewId) {
        var d = q.defer();
        ReviewModel.remove({_id: reviewId},
            function (err, status) {
                if (err) {
                    d.reject(err);
                }
                else {
                    console.log("s5");

                    d.resolve(status);
                }
            });
        return d.promise;
    }

    function deleteUserReview(userId) {
        var d = q.defer();
        ReviewModel.remove({author: userId},
            function (err, status) {
                if (err) {
                    d.reject(err);
                }
                else {
                    d.resolve(status);
                }
            });
        return d.promise;
    }

    function createReview(review) {
        var d = q.defer();
        ReviewModel
            .create(review,
                function (err, review) {
                    if (err) {
                        d.abort(err);
                    } else {
                        d.resolve(review);
                    }
                });
        return d.promise;
    }

    function findReviewByStory(storyId) {
        var d = q.defer();
        ReviewModel
            .find({story: storyId},
                function (err, reviews) {
                    if (err) {
                        d.reject(err);
                    }
                    else {
                        console.log(reviews)
                        d.resolve(reviews);
                    }
                });
        return d.promise;
    }

    function findReviewByDeal(dealId) {
        var d = q.defer();
        ReviewModel
            .find({deal: dealId},
                function (err, reviews) {
                    if (err) {
                        d.reject(err);
                    }
                    else {
                        console.log(reviews)
                        d.resolve(reviews);
                    }
                });
        return d.promise;
    }

    function findReviewsByUser(userId) {
        var d = q.defer();
        ReviewModel
            .find({author: userId},
                function (err, reviews) {
                    if (err) {
                        d.reject(err);
                    }
                    else {
                        console.log(reviews)
                        d.resolve(reviews);
                    }
                });
        return d.promise;
    }
};