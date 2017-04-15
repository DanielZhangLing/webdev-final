(function () {
    angular
        .module("ZipStory")
        .factory("reviewService", reviewService);

    function reviewService($http) {
        var api = {
            "createReview": createReview,
            "findReviewByStory": findReviewByStory,
            "findReviewsByUser": findReviewsByUser,
            "findReviewByDeal": findReviewByDeal,
            "deleteMyReview": deleteMyReview,
        };
        return api;

        function deleteMyReview(reviewId, userId){
            return $http.delete('/api/review/'+reviewId+'/user/'+userId)
                .then(function (response) {
                    if (response) {
                        console.log("s7");
                        return response.data;
                    }
                    else
                        return null;
                });
        }

        function createReview(review) {
            return $http.post('/api/review', review)
                .then(function (response) {
                    if (response) {
                        return response.data;
                    }
                    else
                        return null;
                });
        }

        function findReviewByStory(storyId) {
            return $http.get('/api/review/story/' + storyId)
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

        function findReviewByDeal(dealId) {
            return $http.get('/api/review/deal/' + dealId)
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

        function findReviewsByUser(userId) {
            return $http.get('/api/review/user/' + userId)
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

    }
})();