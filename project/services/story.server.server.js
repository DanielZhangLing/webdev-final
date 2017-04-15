/**
 * Created by LingZhang on 4/10/17.
 */
/**
 * Created by LingZhang on 4/7/17.
 */
module.exports = function (app, model) {

    app.get("/api/stories", findAllStories);
    app.get("/api/story/:sid", findStoryById);
    // app.post("/api/spot", createSpot);
    // app.get("/api/spot/:pid", findSpotByGeoId)
    app.get("/api/stories/:spot", searchStoriesBySpot);
    app.post("/api/story", createStory);
    app.put("/api/story/like/", likeStory);
    app.put("/api/story/dislike/", dislikeStory);
    app.get("/api/story/user/:userId", findStoriesByUser);
    app.get("/api/story/like/:userId", findStoriesByLike);
    app.put("/api/story/:storyId", updateStory);
    app.delete("/api/story/:sid/:uid", deleteStory);
    app.get('/api/story/spot/:spot', findStoryBySpot);

    storyModel = model.storyModel;
    userModel = model.userModel;

    function findStoriesByLike(req, res) {
        console.log("step 3");
        var storyId = req.params.userId;
        var result = [];
        userModel.findUserById(storyId)
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
                    storyModel.findStoryByIds(user.likeStory)
                        .then(
                            function (stories) {
                                res.json(stories);
                            },
                            function (error) {
                                res.sendStatus(404);
                            }
                        );
                })
    }


    function findStoryBySpot(req, res) {
        storyModel.findStoryBySpot(req.params.spot)
            .then(
                function (stories) {
                    console.log(stories)
                    res.json(stories);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function findStoriesByUser(req, res) {
        storyModel.findStoriesByUser(req.params.userId)
            .then(
                function (stories) {
                    console.log("1");
                    res.json(stories);
                },
                function (error) {
                    console.log("2");
                    res.sendStatus(404);
                }
            );
    }

    function searchStoriesBySpot(req, res) {
        storyModel
            .searchStoriesBySpot(req.params.spot)
            .then(function (stories) {
                if (!stories || stories.length == 0) {
                    res.send(500);
                } else {
                    res.json(stories);
                }
            });
    }

    function likeStory(req, res) {
        var storyId = req.body.storyId;
        var userId = req.body.userId;
        storyModel.addLikeForStory(storyId, userId)
            .then(function (story) {
                result = story;
                return model
                    .userModel
                    .addLikeStoryForUser(storyId, userId);
            })
            .then(function (user) {
                if (!user) {
                    res.send(500);
                } else {
                    res.json(result);
                }
            });
    }

    function dislikeStory(req, res) {
        var storyId = req.body.storyId;
        var userId = req.body.userId;
        var result;
        storyModel.deleteLikeForStory(storyId, userId)
            .then(function (story) {
                result = story;
                return model
                    .userModel
                    .deleteLikeStoryForUser(storyId, userId);
            })
            .then(function (user) {
                if (!user) {
                    res.send(500);
                } else {
                    res.json(result);
                }
            });
    }

    function findStoryById(req, res) {
        storyModel
            .findStoryById(req.params.sid)
            .then(function (story) {
                if (!story) {
                    res.send(500);
                } else {
                    res.json(story);
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
    function createStory(req, res) {
        var result;
        var story = req.body;
        storyModel
            .createStory(story)
            .then(
                function (story) {
                    result = story;
                    return model
                        .userModel
                        .addStoryForUser(story.author, story);
                }
            )
            .then(
                function (story) {
                    res.json(result);
                }, function (error) {
                    res.sendStatus(500);
                });
    }

    //
    function findAllStories(req, res) {
        storyModel
            .findAllStories()
            .then(function (stories) {
                res.json(stories);
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
    function deleteStory(req, res) {
        var storyId = req.params.sid;
        var userId = req.params.uid;
        storyModel
            .deleteStory(storyId)
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
                        .deleteStoryForUser(storyId, userId)
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
    function updateStory(req, res) {
        storyModel.updateStory(req.params.storyId, req.body)
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