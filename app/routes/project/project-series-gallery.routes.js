module.exports = APP => {
    // import required node-modules
    const PROJECT_SERIES_GALLERY = require("../../controllers/project/project-series-gallery.controller.js");
    let ROUTER = require("express").Router();

    ROUTER.post("/", PROJECT_SERIES_GALLERY.create);
    ROUTER.get("/", PROJECT_SERIES_GALLERY.findAll);
    ROUTER.get("/:name", PROJECT_SERIES_GALLERY.findOne);
    ROUTER.put("/:id", PROJECT_SERIES_GALLERY.update);
    ROUTER.delete("/:name", PROJECT_SERIES_GALLERY.delete);
    ROUTER.delete("/", PROJECT_SERIES_GALLERY.deleteAll);

    APP.use('/api/project_series_gallery', ROUTER);
};