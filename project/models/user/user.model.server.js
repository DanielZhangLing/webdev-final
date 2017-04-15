/**
 * Created by LingZhang on 4/4/17.
 */
module.exports = function () {

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        deleteUser: deleteUser,
        updateUser: updateUser,
        addStoryForUser: addStoryForUser,
        addDealForUser: addDealForUser,
        postDealForUser: postDealForUser,
        addLikeStoryForUser: addLikeStoryForUser,
        addLikeDealForUser: addLikeDealForUser,
        deleteLikeStoryForUser: deleteLikeStoryForUser,
        deleteLikeDealForUser: deleteLikeDealForUser,
        deleteStoryForUser: deleteStoryForUser,
        deleteDealForUser: deleteDealForUser,
        deletePostDealForUser: deletePostDealForUser,
        addReviewForUser: addReviewForUser,
        deleteReviewForUser: deleteReviewForUser,
        findUserByFacebookId: findUserByFacebookId,
    };

    var q = require("q");
    var mongoose = require('mongoose');
    var userSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', userSchema);

    return api;

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function addReviewForUser(reviewId, userId){
        var d = q.defer();
        UserModel.findById(userId)
            .then(function(user){
                user.myReview.push(reviewId);
                user.save(function(err, user){
                    if(err){
                        d.reject();
                    }else{
                        d.resolve(user);
                    }
                });
            });

        return d.promise;
    }

    function deleteStoryForUser(storyId, userId){
        var d = q.defer();
        UserModel.findById(userId)
            .then(function(user){
                var index = user.myStory.indexOf(storyId);
                user.myStory.splice(index, 1);
                user.save(function(err, user){
                    if(err){
                        d.reject();
                    }else{
                        console.log("sadadsdasd");
                        d.resolve(user);
                    }
                });
            });

        return d.promise;
    }

    function deleteDealForUser(dealId, userId){
        var d = q.defer();
        UserModel.findById(userId)
            .then(function(user){
                var index = user.myDeal.indexOf(dealId);
                user.myDeal.splice(index, 1);
                user.save(function(err, user){
                    if(err){
                        d.reject();
                    }else{
                        console.log("sadadsdasd");
                        d.resolve(user);
                    }
                });
            });

        return d.promise;
    }

    function deletePostDealForUser(dealId, userId){
        var d = q.defer();
        UserModel.findById(userId)
            .then(function(user){
                var index = user.postDeal.indexOf(dealId);
                user.postDeal.splice(index, 1);
                user.save(function(err, user){
                    if(err){
                        d.reject();
                    }else{
                        console.log("sadadsdasd");
                        d.resolve(user);
                    }
                });
            });

        return d.promise;
    }

    function deleteLikeStoryForUser(storyId, userId){
        var d = q.defer();
        UserModel.findById(userId)
            .then(function(user){
                user.likeStory.pull(storyId);
                user.save(function(err, user){
                    if(err){
                        d.reject();
                    }else{
                        d.resolve(user);
                    }
                });
            });

        return d.promise;
    }

    function deleteLikeDealForUser(dealId, userId){
        var d = q.defer();
        UserModel.findById(userId)
            .then(function(user){
                user.likeDeal.pull(dealId);
                user.save(function(err, user){
                    if(err){
                        d.reject();
                    }else{
                        d.resolve(user);
                    }
                });
            });

        return d.promise;
    }

    function deleteReviewForUser(reviewId, userId){
        var d = q.defer();
        UserModel.findById(userId)
            .then(function(user){
                var index = user.myReview.indexOf(reviewId);
                user.myReview.splice(index, 1);
                user.save(function(err, user){
                    if(err){
                        d.reject();
                    }else{
                        console.log("s6");
                        d.resolve(user);
                    }
                });
            });

        return d.promise;
    }

    function addLikeStoryForUser(storyId, userId){
        var d = q.defer();
        UserModel.findById(userId)
            .then(function(user){
                user.likeStory.push(storyId);
                user.save(function(err, user){
                    if(err){
                        d.reject();
                    }else{
                        d.resolve(user);
                    }
                });
            });

        return d.promise;
    }

    function addLikeDealForUser(dealId, userId){
        var d = q.defer();
        UserModel.findById(userId)
            .then(function(user){
                user.likeDeal.push(dealId);
                user.save(function(err, user){
                    if(err){
                        d.reject();
                    }else{
                        d.resolve(user);
                    }
                });
            });

        return d.promise;
    }

    function addStoryForUser(userId, story){
        var d = q.defer();
        UserModel.findById(userId)
            .then(function(user){
                user.myStory.push(story._id);
                user.save(function(err, user){
                    if(err){
                        d.reject();
                    }else{
                        d.resolve(user);
                    }
                });
            });

        return d.promise;
    }

    function addDealForUser(dealId, userId){
        var d = q.defer();
        UserModel.findById(userId)
            .then(function(user){
                console.log("lalalala");
                user.myDeal.push(dealId);
                console.log("lololo");
                user.save(function(err, user){
                    if(err){
                        d.reject();
                    }else{
                        d.resolve(user);
                    }
                });
            });

        return d.promise;
    }

    function postDealForUser(userId, deal){
        var d = q.defer();
        UserModel.findById(userId)
            .then(function(user){
                user.postDeal.push(deal._id);
                user.save(function(err, deal){
                    if(err){
                        d.reject();
                    }else{
                        d.resolve(deal);
                    }
                });
            });

        return d.promise;
    }

    function createUser(user) {
        var d = q.defer();
        UserModel
            .create(user,
                function (err, user) {
                    if (err) {
                        d.reject(err);
                    } else {
                        d.resolve(user);
                    }
                });
        return d.promise;
    }

    function findAllUsers() {
        var d = q.defer();
        UserModel
            .find(function (err, users) {
                if (err) {
                    d.abort(err);
                } else {
                    d.resolve(users);
                }
            });
        return d.promise;
    }

    function findUserById(userId) {
        var d = q.defer();
        console.log("b");
        UserModel.findById(userId,
            function (err, user) {
                if (err) {
                    console.log("c");
                    d.reject(err)
                } else {
                    d.resolve(user);
                }
            });
        return d.promise;
    }

    function findUserByUsername(userName) {
        console.log("wawawa");
        var d = q.defer();
        UserModel.findOne({username: userName}, function (err, user) {
            console.log("wawawawa");
            if (err) {
                d.reject(err);
            }
            else {
                d.resolve(user);
            }
        });
        return d.promise;
    }

    function findUserByCredentials(credentials) {
        var d = q.defer();
        UserModel
            .findOne({
                    username: credentials.username,
                },
                function (err, user) {
                    if (err) {
                        console.log("heheh5");
                        d.abort(err)
                    } else {
                        console.log("heheh6");
                        d.resolve(user);
                    }
                });
        return d.promise;
    }

    function deleteUser(userId) {
        var d = q.defer();
        UserModel.remove({_id: userId},
            function (err, status) {
                if (err) {
                    d.abort(err);
                }
                else {
                    d.resolve(status);
                }
            });
    }

    function updateUser(userId, user) {
        var d = q.defer();
        UserModel
            .update({
                    _id: userId
                }, {
                    $set: user
                },
                function (err, user) {
                    if (err) {
                        d.reject()
                    } else {
                        d.resolve(user);
                    }
                });
        return d.promise;
    }
};