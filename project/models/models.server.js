module.exports = function () {
    var connectionString = 'mongodb://127.0.0.1:27017/project';
    if (process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }
    var mongoose = require("mongoose");  // npm install mongoose --save
    mongoose.connect(connectionString);
    var model = {
        userModel: require("./user/user.model.server.js")(),
        spotModel: require("./spot/spot.model.server.js")(),
        storyModel: require("./story/story.model.server.js")(),
        dealModel: require("./deal/deal.model.server.js")(),
        reviewModel: require("./review/review.model.server.js")()
    };
    mongoose.Promise = global.Promise;

    return model;
};