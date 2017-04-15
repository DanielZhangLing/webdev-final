/**
 * Created by LingZhang on 4/10/17.
 */
module.exports = function () {

    var api = {
        // createUser: createUser,
        // findUserByCredentials: findUserByCredentials,
        findDealById: findDealById,
        addLikeForDeal: addLikeForDeal,
        addBuyForDeal: addBuyForDeal,
        deleteLikeForDeal: deleteLikeForDeal,
        deleteBuyForDeal: deleteBuyForDeal,
        // findUserByUsername: findUserByUsername,
        findAllDeals: findAllDeals,
        deleteDeal: deleteDeal,
        // updateUser: updateUser,
        // findSpotByGeoId: findSpotByGeoId,
        createDeal: createDeal,
        searchDealsBySpot: searchDealsBySpot,
        findPostDealsByUser: findPostDealsByUser,
        updateDeal: updateDeal,
        findDealByIds: findDealByIds,
        findDealBySpot: findDealBySpot,
    };

    var q = require("q");
    var mongoose = require('mongoose');
    var dealSchema = require('./deal.schema.server')();
    var DealModel = mongoose.model('DealModel', dealSchema);

    return api;

    function findDealBySpot(spot){
        var d = q.defer();
        DealModel
            .find({spot: spot.toLowerCase()},
                function (err, deals) {
                    if (err) {
                        d.reject(err);
                    }
                    else {
                        d.resolve(deals);
                    }
                });
        return d.promise;
    }

    function findPostDealsByUser(userId) {
        var d = q.defer();
        DealModel
            .find({author: userId},
                function (err, deals) {
                    if (err) {
                        console.log("wamg");
                        d.reject(err);
                    }
                    else {
                        console.log(deals)
                        d.resolve(deals);
                    }
                });
        return d.promise;
    }

    function searchDealsBySpot(spot) {
        var d = q.defer();
        DealModel
            .find({spot: spot.toLowerCase()},
                function (err, deals) {
                    if (err) {
                        d.reject(err);
                    }
                    else {
                        console.log(deals)
                        d.resolve(deals);
                    }
                });
        return d.promise;
    }

    function findAllDeals() {
        var d = q.defer();
        DealModel
            .find(function (err, deals) {
                if (err) {
                    d.abort(err);
                } else {
                    d.resolve(deals);
                }
            }).sort({dateCreated: -1});
        return d.promise;
    }

    function deleteLikeForDeal(dealId, userId) {
        var d = q.defer();
        DealModel.findById(dealId)
            .then(function (deal) {
                deal.likeUser.pop(userId);
                deal.save(function (err, deal) {
                    if (err) {
                        d.reject();
                    } else {
                        d.resolve(deal);
                    }
                });
            });

        return d.promise;
    }

    function deleteBuyForDeal(dealId, userId) {
        var d = q.defer();
        DealModel.findById(dealId)
            .then(function (deal) {
                deal.buyUser.pop(userId);
                deal.save(function (err, deal) {
                    if (err) {
                        d.reject();
                    } else {
                        d.resolve(deal);
                    }
                });
            });

        return d.promise;
    }

    function addLikeForDeal(dealId, userId) {
        var d = q.defer();
        DealModel.findById(dealId)
            .then(function (deal) {
                deal.likeUser.push(userId);
                deal.save(function (err, deal) {
                    if (err) {
                        d.reject();
                    } else {
                        d.resolve(deal);
                    }
                });
            });

        return d.promise;
    }

    function addBuyForDeal(dealId, userId) {
        var d = q.defer();
        DealModel.findById(dealId)
            .then(function (deal) {
                deal.buyUser.push(userId);
                deal.save(function (err, deal) {
                    if (err) {
                        d.reject();
                    } else {
                        d.resolve(deal);
                    }
                });
            });

        return d.promise;
    }

    // function findSpotByGeoId(spotGeoId) {
    //     var d = q.defer();
    //     console.log(spotGeoId)
    //     SpotModel
    //         .findOne({geoNameId: spotGeoId},
    //             function (err, spot) {
    //                 if (err) {
    //                     console.log('1')
    //                     d.reject(err);
    //                 }
    //                 else {
    //                     console.log(spot)
    //                     d.resolve(spot);
    //                 }
    //             });
    //     return d.promise;
    // }

    function createDeal(deal) {
        var d = q.defer();
        DealModel
            .create(deal,
                function (err, deal) {
                    if (err) {
                        d.abort(err);
                    } else {
                        d.resolve(deal);
                    }
                });
        return d.promise;
    }

    // function findAllUsers() {
    //     var d = q.defer();
    //     UserModel
    //         .find(function (err, users) {
    //             if (err) {
    //                 d.abort(err);
    //             } else {
    //                 d.resolve(users);
    //             }
    //         });
    //     return d.promise;
    // }
    //
    function findDealById(dealId) {
        var d = q.defer();
        DealModel.findById(dealId,
            function (err, deal) {
                if (err) {
                    d.reject(err)
                } else {
                    d.resolve(deal);
                }
            });
        return d.promise;
    }

    function findDealByIds(dealIds) {
        var d = q.defer();
        DealModel.find({_id: {$in: dealIds}},
            function (err, deal) {
                if (err) {
                    d.reject(err)
                } else {
                    d.resolve(deal);
                }
            });
        return d.promise;
    }


    //
    // function findUserByUsername(userName) {
    //     console.log("wawawa");
    //     var d = q.defer();
    //     UserModel.findOne({username: userName}, function (err, user) {
    //         console.log("wawawawa");
    //         if (err) {
    //             d.reject(err);
    //         }
    //         else {
    //             d.resolve(user);
    //         }
    //     });
    //     return d.promise;
    // }
    //
    // function findUserByCredentials(credentials) {
    //     var d = q.defer();
    //     UserModel
    //         .findOne({
    //                 username: credentials.username,
    //                 password: credentials.password
    //             },
    //             function (err, user) {
    //                 if (err) {
    //                     console.log("heheh5");
    //                     d.abort(err)
    //                 } else {
    //                     console.log("heheh6");
    //                     d.resolve(user);
    //                 }
    //             });
    //     return d.promise;
    // }
    //
    function deleteDeal(dealId) {
        console.log("dasdasdsad" + dealId);
        var d = q.defer();
        DealModel.remove({_id: dealId},
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

    //
    function updateDeal(dealId, deal) {
        var d = q.defer();
        DealModel
            .update({
                    _id: dealId
                }, {
                    $set: deal
                },
                function (err, deal) {
                    if (err) {
                        d.reject()
                    } else {
                        d.resolve(deal);
                    }
                });
        return d.promise;
    }
};