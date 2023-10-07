module.exports = APP => {
    // import required node-modules
    const HERO_IMAGE = require("../../controllers/overview/hero-image.controller.js");
    let ROUTER = require("express").Router();

    ROUTER.post("/", HERO_IMAGE.create);
    ROUTER.get("/", HERO_IMAGE.findAll);
    ROUTER.get("/:name", HERO_IMAGE.findOne);
    ROUTER.put("/:id", HERO_IMAGE.update);
    ROUTER.delete("/:name", HERO_IMAGE.delete);
    ROUTER.delete("/", HERO_IMAGE.deleteAll);

    APP.use('/api/hero_image', ROUTER);
};