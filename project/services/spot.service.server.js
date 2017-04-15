/**
 * Created by LingZhang on 4/7/17.
 */
module.exports = function (app, model) {

    // app.get("/api/user", findUser);
    // app.get("/api/spot/:spotId", findSpotById);
    app.post("/api/spot", createSpot);
    app.get("/api/spot/:pid", findSpotByGeoId)
    // app.post("/api/user", createUser);
    // app.put("/api/user/:userId", updateUser);
    // app.delete("/api/user/:userId", deleteUser);

    spotModel = model.spotModel;

    function findSpotByGeoId(req,res){
        spotModel
            .findSpotByGeoId(req.params.pid)
            .then(function (spot) {
                if (!spot) {
                    res.send(500);
                } else {
                    res.json(spot);
                }
            });
    }

    function createSpot(req, res) {
        newSpot = req.body;
        spotModel
            .findSpotByGeoId(newSpot.geoNameId)
            .then(
                function (spot) {
                    if (spot) {
                        res.json(spot);
                    } else {
                        spotModel
                            .createSpot(newSpot)
                            .then(function(spot){
                                if(spot)
                                    res.json(spot);
                                else
                                    res.status(500);
                            })
                    }
                },
                function (err) {
                    res.status(500).send(err);
                }
            )
    }

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
    // function createUser(req, res) {
    //     userModel
    //         .createUser(req.body)
    //         .then(function (user) {
    //             if (err) {
    //                 res.send(500);
    //             } else {
    //                 res.json(user);
    //             }
    //         });
    // }
    //
    // function findAllUsers(req, res) {
    //     userModel
    //         .findAllUsers()
    //         .then(function (users) {
    //             if (err) {
    //                 res.send(500);
    //             } else {
    //                 res.json(users);
    //             }
    //         });
    // }
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
    // function deleteUser(req, res) {
    //     userModel
    //         .deleteUser(req.params.userId)
    //         .then(function (status) {
    //             if (err) {
    //                 res.send(500);
    //             } else {
    //                 res.json(status);
    //             }
    //         });
    // }
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
    // function updateUser(req, res) {
    //     var userId = req.params.userId;
    //     var newUser = req.body;
    //     userModel.updateUser(userId, newUser)
    //         .then(
    //             function (status) {
    //                 res.json(status);
    //             },
    //             function (error) {
    //                 res.sendStatus(400);
    //             }
    //         );
    // }
};