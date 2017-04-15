(function () {
    angular
        .module("ZipStory")
        .factory("dealService", dealService);

    function dealService($http) {
        var api = {
            "createDeal": createDeal,
            "findDealById": findDealById,
            "likeDeal": likeDeal,
            "buyDeal": buyDeal,
            "cancelDeal": cancelDeal,
            "dislikeDeal": dislikeDeal,
            "searchDealsBySpot": searchDealsBySpot,
            "findDealsByUser": findDealsByUser,
            "updateDeal": updateDeal,
            "deleteDeal": deleteDeal,
            "findDealBySpot": findDealBySpot,
            // "findUserById": findUserById,
            // "findUserByUsername": findUserByUsername,
            // "findUserByCredentials": findUserByCredentials,
            // "register": register,
            // "loggedIn": loggedIn,
            // "login": login,
            // "logout": logout,
            // "sAdmin": isAdmin,
            "findAllDeals": findAllDeals,
            "findDealsByLike": findDealsByLike,
            "findPostDealsByUser": findPostDealsByUser,
        };
        return api;

        function findDealBySpot(spot) {
            return $http.get('/api/deal/spot/' + spot)
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

        function deleteDeal(dealId, userId) {
            console.log("dsdsd")
            return $http.delete('/api/deal/' + dealId + '/' + userId)
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

        function findDealsByLike(userId) {
            console.log("step 2");
            return $http.get('/api/deal/like/' + userId)
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

        function dislikeDeal(dealId, userId) {
            return $http.put('/api/deal/dislike',
                {"userId": userId, "dealId": dealId})
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

        function cancelDeal(dealId, userId) {
            return $http.put('/api/deal/cancel',
                {"userId": userId, "dealId": dealId})
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

        function findDealsByUser(userId) {
            return $http.get('/api/deal/buy/' + userId)
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

        function findPostDealsByUser(userId) {
            return $http.get('/api/deal/user/' + userId)
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

        function likeDeal(dealId, userId) {
            return $http.put('/api/deal/like/', {
                "dealId": dealId,
                "userId": userId
            })
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

        function buyDeal(dealId, userId) {
            return $http.put('/api/deal/buy/', {
                "dealId": dealId,
                "userId": userId
            })
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

        function findDealById(dealId) {
            return $http.get('/api/deal/' + dealId)
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

        //
        function findAllDeals() {
            return $http.get('/api/deals')
                .then(function (response) {
                    if (response)
                        return response.data;
                    else
                        return null;
                });
        }

        function searchDealsBySpot(spot) {
            return $http.get('/api/deals/' + spot)
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

        function createDeal(deal) {
            console.log("here");
            return $http.post('/api/deal', deal)
                .then(function (response) {
                    if (response) {
                        return response.data;
                    }
                    else
                        return null;
                });
        }

        function updateDeal(dealId, deal) {
            return $http.put('/api/deal/' + dealId, deal)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return null;
                });
        }
    }
})();