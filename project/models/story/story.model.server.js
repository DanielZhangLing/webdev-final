/**
 * Created by LingZhang on 4/10/17.
 */
module.exports = function () {

    var api = {
        // createUser: createUser,
        // findUserByCredentials: findUserByCredentials,
        findStoryById: findStoryById,
        addLikeForStory: addLikeForStory,
        deleteLikeForStory: deleteLikeForStory,
        // findUserByUsername: findUserByUsername,
        findAllStories: findAllStories,
        deleteStory: deleteStory,
        // updateUser: updateUser,
        // findSpotByGeoId: findSpotByGeoId,
        createStory: createStory,
        searchStoriesBySpot: searchStoriesBySpot,
        findStoriesByUser: findStoriesByUser,
        updateStory: updateStory,
        findStoryByIds: findStoryByIds,
        findStoryBySpot: findStoryBySpot,
    };

    var q = require("q");
    var mongoose = require('mongoose');
    var storySchema = require('./story.schema.server')();
    var StoryModel = mongoose.model('StoryModel', storySchema);

    return api;

    function findStoryBySpot(spot){
        var d = q.defer();
        StoryModel
            .find({spot: spot.toLowerCase()},
                function (err, stories) {
                    if (err) {
                        d.reject(err);
                    }
                    else {
                        d.resolve(stories);
                    }
                });
        return d.promise;
    }

    function findStoriesByUser(userId) {
        var d = q.defer();
        StoryModel
            .find({author: userId},
                function (err, stories) {
                    if (err) {
                        console.log("wamg");
                        d.reject(err);
                    }
                    else {
                        console.log(stories)
                        d.resolve(stories);
                    }
                });
        return d.promise;
    }

    function searchStoriesBySpot(spot) {
        var d = q.defer();
        StoryModel
            .find({spot: spot.toLowerCase()},
                function (err, stories) {
                    if (err) {
                        d.reject(err);
                    }
                    else {
                        console.log(stories)
                        d.resolve(stories);
                    }
                });
        return d.promise;
    }

    function findAllStories() {
        var d = q.defer();
        StoryModel
            .find(function (err, stories) {
                if (err) {
                    d.abort(err);
                } else {
                    d.resolve(stories);
                }
            }).sort({dateCreated: -1});
        return d.promise;
    }

    function deleteLikeForStory(storyId, userId) {
        var d = q.defer();
        StoryModel.findById(storyId)
            .then(function (story) {
                story.likeUser.pop(userId);
                story.save(function (err, story) {
                    if (err) {
                        d.reject();
                    } else {
                        d.resolve(story);
                    }
                });
            });

        return d.promise;
    }

    function addLikeForStory(storyId, userId) {
        var d = q.defer();
        StoryModel.findById(storyId)
            .then(function (story) {
                story.likeUser.push(userId);
                story.save(function (err, story) {
                    if (err) {
                        d.reject();
                    } else {
                        d.resolve(story);
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

    function createStory(story) {
        var d = q.defer();
        StoryModel
            .create(story,
                function (err, story) {
                    if (err) {
                        d.abort(err);
                    } else {
                        d.resolve(story);
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
    function findStoryById(storyId) {
        var d = q.defer();
        StoryModel.findById(storyId,
            function (err, story) {
                if (err) {
                    d.reject(err)
                } else {
                    d.resolve(story);
                }
            });
        return d.promise;
    }

    function findStoryByIds(storyIds) {
        var d = q.defer();
        StoryModel.find({_id: {$in: storyIds}},
            function (err, story) {
                if (err) {
                    d.reject(err)
                } else {
                    d.resolve(story);
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
    function deleteStory(storyId) {
        console.log("dasdasdsad" + storyId);
        var d = q.defer();
        StoryModel.remove({_id: storyId},
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
    function updateStory(storyId, story) {
        var d = q.defer();
        StoryModel
            .update({
                    _id: storyId
                }, {
                    $set: story
                },
                function (err, story) {
                    if (err) {
                        d.reject()
                    } else {
                        d.resolve(story);
                    }
                });
        return d.promise;
    }
};