module.exports = APP => {
    // import required node-modules
    const PROJECT_ITEM = require("../../controllers/project/project-item.controller.js");
    let ROUTER = require("express").Router();

    ROUTER.post("/", PROJECT_ITEM.create);
    ROUTER.get("/", PROJECT_ITEM.findAll);
    ROUTER.get("/:name", PROJECT_ITEM.findOne);
    ROUTER.put("/:id", PROJECT_ITEM.update);
    ROUTER.delete("/:name", PROJECT_ITEM.delete);
    ROUTER.delete("/", PROJECT_ITEM.deleteAll);

    APP.use('/api/project_item', ROUTER);
};