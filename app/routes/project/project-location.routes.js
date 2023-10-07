module.exports = APP => {
    // import required node-modules
    const PROJECT_LOCATION = require("../../controllers/project/project-location.controller.js");
    let ROUTER = require("express").Router();

    ROUTER.post("/", PROJECT_LOCATION.create);
    ROUTER.get("/", PROJECT_LOCATION.findAll);
    ROUTER.get("/:name", PROJECT_LOCATION.findOne);
    ROUTER.put("/:id", PROJECT_LOCATION.update);
    ROUTER.delete("/:name", PROJECT_LOCATION.delete);
    ROUTER.delete("/", PROJECT_LOCATION.deleteAll);

    APP.use('/api/project_location', ROUTER);
};