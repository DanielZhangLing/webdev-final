/**
 * Created by LingZhang on 4/12/17.
 */
module.exports = function (app, model) {

    app.post("/api/review", createReview);
    app.get("/api/review/story/:storyId", findReviewByStory);
    app.get("/api/review/deal/:dealId", findReviewByDeal);
    app.get("/api/review/user/:userId", findReviewsByUser);
    app.delete('/api/review/:reviewId/user/:userId', deleteMyReview)

    storyModel = model.storyModel;
    userModel = model.userModel;
    reviewModel = model.reviewModel;

    function deleteMyReview(req, res) {
        var reviewId = req.params.reviewId;
        var userId = req.params.userId;
        reviewModel
            .deleteReview(reviewId)
            .then(
                function (review) {
                    console.log("s1");
                    return review;
                },
                function (error) {
                    console.log("s2");
                    res.sendStatus(404);
                })
            .then(
                function (status) {
                    userModel
                        .deleteReviewForUser(reviewId, userId)
                        .then(function (user) {
                            if (user) {
                                console.log("s4");
                                res.json(user);
                            } else {
                                console.log("s3");
                                res.send(500);
                            }
                        })
                }
            )
    }

    function createReview(req, res) {
        var result;
        var review = req.body;
        reviewModel
            .createReview(review)
            .then(
                function (review) {
                    result = review;
                    return model
                        .userModel
                        .addReviewForUser(review._id, review.author);
                }
            )
            .then(
                function (review) {
                    res.json(result);
                }, function (error) {
                    res.sendStatus(500);
                });
    }

    function findReviewByStory(req, res) {
        reviewModel.findReviewByStory(req.params.storyId)
            .then(
                function (reviews) {
                    console.log("1");
                    res.json(reviews);
                },
                function (error) {
                    console.log("2");
                    res.sendStatus(404);
                }
            );
    }

    function findReviewByDeal(req, res) {
        reviewModel.findReviewByDeal(req.params.dealId)
            .then(
                function (reviews) {
                    console.log("1");
                    res.json(reviews);
                },
                function (error) {
                    console.log("2");
                    res.sendStatus(404);
                }
            );
    }

    function findReviewsByUser(req, res) {
        reviewModel.findReviewsByUser(req.params.userId)
            .then(
                function (reviews) {
                    console.log("1");
                    res.json(reviews);
                },
                function (error) {
                    console.log("2");
                    res.sendStatus(404);
                }
            );
    }
};