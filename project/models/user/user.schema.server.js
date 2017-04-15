/**
 * Created by LingZhang on 4/1/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        state: String,
        pic: String,
        myReview: [{type: mongoose.Schema.Types.ObjectId, ref: 'ReviewModel'}],
        type: {type: String, enum: ['USER', 'MERCHANT', 'ADMIN']},
        myStory: [{type: mongoose.Schema.Types.ObjectId, ref: 'StoryModel'}],
        likeStory: [{type: mongoose.Schema.Types.ObjectId, ref: 'StoryModel'}],
        myDeal: [{type: mongoose.Schema.Types.ObjectId, ref: 'DealModel'}],
        likeDeal: [{type: mongoose.Schema.Types.ObjectId, ref: 'DealModel'}],
        postDeal: [{type: mongoose.Schema.Types.ObjectId, ref: 'DealModel'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: 'project.user'});

    return UserSchema;
};