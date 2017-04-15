(function () {
    angular
        .module("ZipStory")
        .factory("storyService", storyService);

    function storyService($http) {
        var api = {
            "createStory": createStory,
            "findStoryById": findStoryById,
            "likeStory": likeStory,
            "dislikeStory": dislikeStory,
            "searchStoriesBySpot": searchStoriesBySpot,
            "findStoriesByUser": findStoriesByUser,
            "updateStory": updateStory,
            "deleteStory": deleteStory,
            "findStoryBySpot": findStoryBySpot,
            // "findUserById": findUserById,
            // "findUserByUsername": findUserByUsername,
            // "findUserByCredentials": findUserByCredentials,
            // "register": register,
            // "loggedIn": loggedIn,
            // "login": login,
            // "logout": logout,
            // "sAdmin": isAdmin,
            "findAllStories": findAllStories,
            "findStoriesByLike": findStoriesByLike,
        };
        return api;

        function findStoryBySpot(spot) {
            return $http.get('/api/story/spot/' + spot)
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

        function deleteStory(storyId, userId) {
            console.log("dsdsd")
            return $http.delete('/api/story/' + storyId + '/' + userId)
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

        function findStoriesByLike(userId) {
            console.log("step 2");
            return $http.get('/api/story/like/' + userId)
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

        function dislikeStory(storyId, userId) {
            return $http.put('/api/user/dislike',
                {"userId": userId, "storyId": storyId})
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

        function findStoriesByUser(userId) {
            return $http.get('/api/story/user/' + userId)
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

        function likeStory(storyId, userId) {
            return $http.put('/api/story/like/', {
                "storyId": storyId,
                "userId": userId
            })
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

        function findStoryById(storyId) {
            return $http.get('/api/story/' + storyId)
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

        //
        function findAllStories() {
            return $http.get('/api/stories')
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

        function searchStoriesBySpot(spot) {
            return $http.get('/api/stories/' + spot)
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

        //
        // function isAdmin() {
        //     return $http.get('/api/isAdmin')
        //         .then(function (response) {
        //             return response.data;
        //         });
        // }
        //
        // function logout() {
        //     return $http.post('/api/logout')
        //         .then(function (response) {
        //             return response.data;
        //         });
        // }
        //
        // function login(user) {
        //     console.log("fk2");
        //     return $http.post('/api/login', user)
        //         .then(function (response) {
        //             console.log(response);
        //             return response.data;
        //         }, function (err) {
        //             return null;
        //         });
        // }
        //
        // function loggedIn() {
        //     return $http.get('/api/loggedIn')
        //         .then(function (response) {
        //             return response.data;
        //         });
        // }

        function createStory(story) {
            console.log("here");
            return $http.post('/api/story', story)
                .then(function (response) {
                    if (response) {
                        return response.data;
                    }
                    else
                        return null;
                });
        }

        function updateStory(storyId, story) {
            return $http.put('/api/story/' + storyId, story)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return null;
                });
        }
    }
})();