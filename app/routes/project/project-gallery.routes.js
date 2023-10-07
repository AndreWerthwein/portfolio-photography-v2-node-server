module.exports = APP => {
    // import required node-modules
    const PROJECT_GALLERY = require("../../controllers/project/project-gallery.controller.js");
    let ROUTER = require("express").Router();

    ROUTER.post("/", PROJECT_GALLERY.create);
    ROUTER.get("/", PROJECT_GALLERY.findAll);
    ROUTER.get("/:name", PROJECT_GALLERY.findOne);
    ROUTER.put("/:id", PROJECT_GALLERY.update);
    ROUTER.delete("/:name", PROJECT_GALLERY.delete);
    ROUTER.delete("/", PROJECT_GALLERY.deleteAll);

    APP.use('/api/project_gallery', ROUTER);
};