/**
 * Created by LingZhang on 4/10/17.
 */
/**
 * Created by LingZhang on 4/7/17.
 */
module.exports = function (app, model) {

    app.get("/api/deals", findAllDeals);
    app.get("/api/deal/:did", findDealById);
    // app.post("/api/spot", createSpot);
    // app.get("/api/spot/:pid", findSpotByGeoId)
    app.get("/api/deals/:spot", searchDealsBySpot);
    app.post("/api/deal", createDeal);
    app.put("/api/deal/like/", likeDeal);
    app.put("/api/deal/buy/", buyDeal);
    app.put("/api/deal/dislike/", dislikeDeal);
    app.put("/api/deal/cancel/", cancelDeal);
    app.get("/api/deal/buy/:userId", findDealsByUser);
    app.get("/api/deal/like/:userId", findDealsByLike);
    app.get("/api/deal/user/:userId", findPostDealsByUser);
    app.put("/api/deal/:dealId", updateDeal);
    app.delete("/api/deal/:did/:uid", deleteDeal);
    app.get('/api/deal/spot/:spot', findDealBySpot);

    dealModel = model.dealModel;
    userModel = model.userModel;

    function findDealsByLike(req, res) {
        console.log("step 3");
        var dealId = req.params.userId;
        userModel.findUserById(dealId)
            .then(
                function (user) {
                    return user;
                },
                function (error) {
                    res.sendStatus(404);
                }
            )
            .then(
                function (user) {
                    dealModel.findDealByIds(user.likeDeal)
                        .then(
                            function (deals) {
                                res.json(deals);
                            },
                            function (error) {
                                res.sendStatus(404);
                            }
                        );
                })
    }


    function findDealBySpot(req, res) {
        dealModel.findDealBySpot(req.params.spot)
            .then(
                function (deals) {
                    console.log(deals)
                    res.json(deals);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function findPostDealsByUser(req, res) {
        dealModel.findPostDealsByUser(req.params.userId)
            .then(
                function (deals) {
                    console.log("1");
                    res.json(deals);
                },
                function (error) {
                    console.log("2");
                    res.sendStatus(404);
                }
            );
    }

    function findDealsByUser(req, res) {
        console.log("step 3");
        var dealId = req.params.userId;
        userModel.findUserById(dealId)
            .then(
                function (user) {
                    return user;
                },
                function (error) {
                    res.sendStatus(404);
                }
            )
            .then(
                function (user) {
                    dealModel.findDealByIds(user.myDeal)
                        .then(
                            function (deals) {
                                res.json(deals);
                            },
                            function (error) {
                                res.sendStatus(404);
                            }
                        );
                })
    }

    function searchDealsBySpot(req, res) {
        dealModel
            .searchDealsBySpot(req.params.spot)
            .then(function (deals) {
                if (!deals || deals.length == 0) {
                    res.send(500);
                } else {
                    res.json(deals);
                }
            });
    }

    function likeDeal(req, res) {
        var dealId = req.body.dealId;
        var userId = req.body.userId;
        dealModel.addLikeForDeal(dealId, userId)
            .then(function (deal) {
                result = deal;
                return model
                    .userModel
                    .addLikeDealForUser(dealId, userId);
            })
            .then(function (user) {
                if (!user) {
                    res.send(500);
                } else {
                    res.json(result);
                }
            });
    }

    function buyDeal(req, res) {
        var dealId = req.body.dealId;
        var userId = req.body.userId;
        dealModel.addBuyForDeal(dealId, userId)
            .then(function (deal) {
                result = deal;
                return model
                    .userModel
                    .addDealForUser(dealId, userId);
            })
            .then(function (user) {
                if (!user) {
                    res.send(500);
                } else {
                    res.json(result);
                }
            });
    }

    function dislikeDeal(req, res) {
        var dealId = req.body.dealId;
        var userId = req.body.userId;
        var result;
        dealModel.deleteLikeForDeal(dealId, userId)
            .then(function (deal) {
                result = deal;
                return model
                    .userModel
                    .deleteLikeDealForUser(dealId, userId);
            })
            .then(function (user) {
                if (!user) {
                    res.send(500);
                } else {
                    res.json(result);
                }
            });
    }

    function cancelDeal(req, res) {
        var dealId = req.body.dealId;
        var userId = req.body.userId;
        var result;
        dealModel.deleteBuyForDeal(dealId, userId)
            .then(function (deal) {
                result = deal;
                return model
                    .userModel
                    .deleteDealForUser(dealId, userId);
            })
            .then(function (user) {
                if (!user) {
                    res.send(500);
                } else {
                    res.json(result);
                }
            });
    }

    function findDealById(req, res) {
        dealModel
            .findDealById(req.params.did)
            .then(function (deal) {
                if (!deal) {
                    res.send(500);
                } else {
                    res.json(deal);
                }
            });
    }

    // function createSpot(req, res) {
    //     newSpot = req.body;
    //     console.log(newSpot.geoNameId);
    //     spotModel
    //         .findSpotByGeoId(newSpot.geoNameId)
    //         .then(
    //             function (spot) {
    //                 if (spot) {
    //                     console.log("ha")
    //                     res.json(spot);
    //                 } else {
    //                     console.log("hei")
    //                     return spotModel.createSpot(newSpot);
    //                 }
    //             },
    //             function (err) {
    //                 res.status(500).send(err);
    //             }
    //         )
    // }

    // function login(req, res) {
    //     console.log("aaa");
    //     var user = req.user;
    //     res.json(user);
    // }
    //
    // function logout(req, res) {
    //     req.logOut();
    //     res.send(200);
    // }
    //
    // function loggedIn(req, res) {
    //     res.send(req.isAuthenticated() ? req.user : '0');
    // }
    //
    // function isAdmin(req, res) {
    //     res.send(req.isAuthenticated() && req.user.roles && req.user.roles.indexOf('ADMIN') > -1 ? req.user : '0');
    // }
    //
    // function findUserById(req, res) {
    //     userModel
    //         .findUserById(req.params.userId)
    //         .then(function (user) {
    //             if (err) {
    //                 res.send(500);
    //             } else {
    //                 res.json(user);
    //             }
    //         });
    // }
    //
    // function findUserByUsername(req, res) {
    //     userModel
    //         .findUserByUsername(req.params.username)
    //         .then(function (user) {
    //             if (err) {
    //                 res.send(500);
    //             } else {
    //                 res.json(user);
    //             }
    //         });
    // }
    //
    function createDeal(req, res) {
        var result;
        var deal = req.body;
        dealModel
            .createDeal(deal)
            .then(
                function (deal) {
                    result = deal;
                    return model
                        .userModel
                        .postDealForUser(deal.author, deal);
                }
            )
            .then(
                function (deal) {
                    res.json(result);
                }, function (error) {
                    res.sendStatus(500);
                });
    }

    //
    function findAllDeals(req, res) {
        dealModel
            .findAllDeals()
            .then(function (deals) {
                res.json(deals);
            }, function (error) {
                res.sendStatus(500);
            });
    }

    //
    // function updateUser(req, res) {
    //     userModel
    //         .updateUser(req.params.userId, req.body)
    //         .then(function (status) {
    //             if (err) {
    //                 res.send(500);
    //             } else {
    //                 res.json(status);
    //             }
    //         });
    // }
    //
    function deleteDeal(req, res) {
        var dealId = req.params.did;
        var userId = req.params.uid;
        dealModel
            .deleteDeal(dealId)
            .then(
                function (user) {
                    return user;
                },
                function (error) {
                    res.sendStatus(404);
                })
            .then(
                function (status) {
                    userModel
                        .deletePostDealForUser(dealId, userId)
                        .then(function (user) {
                            if (user) {
                                res.json(user);
                            } else {
                                res.send(500);
                            }
                        })
                }
            )
    }

    //
    // function serializeUser(user, done) {
    //     done(null, user);
    // }
    //
    // function deserializeUser(user, done) {
    //     console.log("bbboom");
    //     userModel
    //         .findUserById(user._id)
    //         .then(
    //             function (user) {
    //                 done(null, user);
    //             },
    //             function (err) {
    //                 done(err, null);
    //             }
    //         );
    // }
    //
    // function authorized(req, res, next) {
    //     if (!req.isAuthenticated()) {
    //         console.log("lala");
    //         res.send(401);
    //     } else {
    //         next();
    //     }
    // }
    //
    function updateDeal(req, res) {
        dealModel.updateDeal(req.params.dealId, req.body)
            .then(
                function (status) {
                    res.json(status);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
    }
};