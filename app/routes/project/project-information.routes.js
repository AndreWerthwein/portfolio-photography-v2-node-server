module.exports = APP => {
    // import required node-modules
    const PROJECT_INFORMATION = require("../../controllers/project/project-information.controller.js");
    let ROUTER = require("express").Router();

    ROUTER.post("/", PROJECT_INFORMATION.create);
    ROUTER.get("/", PROJECT_INFORMATION.findAll);
    ROUTER.get("/:name", PROJECT_INFORMATION.findOne);
    ROUTER.put("/:id", PROJECT_INFORMATION.update);
    ROUTER.delete("/:name", PROJECT_INFORMATION.delete);
    ROUTER.delete("/", PROJECT_INFORMATION.deleteAll);

    APP.use('/api/project_information', ROUTER);
};