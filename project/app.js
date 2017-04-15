module.exports = function (app) {
    var model = require("./models/models.server")();
    require("./services/user.service.server")(app, model);
    require("./services/spot.service.server")(app, model);
    require("./services/story.server.server")(app,model);
    require("./services/deal.service.server")(app, model);
    require("./services/review.service.server")(app, model);
};