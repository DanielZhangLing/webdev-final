/**
 * Created by LingZhang on 4/1/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var StorySchema = mongoose.Schema({
        geoNameId: String,
        title: String,
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        authorName: String,
        description: String,
        image: String,
        spot: String,
        rate: Number,
        tags: [{type: String}], // TODO: add tag model
        likeUser: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
        reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'ReviewModel'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: 'project.story'});

    return StorySchema;
};