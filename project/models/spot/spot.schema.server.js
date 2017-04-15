/**
 * Created by LingZhang on 4/1/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var SpotSchema = mongoose.Schema({
        geoNameId: String,
        feature: String,
        rank: String,
        summary: String,
        content: String,
        title: String,
        thumbnailImg: String,
        wikipediaUrl: String,
        rate: Number,
        dateCreated: {type:Date, default: Date.now()}
    }, {collection: 'project.spot'});

    return SpotSchema;
};