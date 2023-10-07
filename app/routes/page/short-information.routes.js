module.exports = APP => {
    // import required node-modules
    const SHORT_INFORMATION = require("../../controllers/page/short-information.controller.js");
    let ROUTER = require("express").Router();

    ROUTER.post("/", SHORT_INFORMATION.create);
    ROUTER.get("/", SHORT_INFORMATION.findAll);
    ROUTER.get("/:name", SHORT_INFORMATION.findOne);
    ROUTER.put("/:id", SHORT_INFORMATION.update);
    ROUTER.delete("/:name", SHORT_INFORMATION.delete);
    ROUTER.delete("/", SHORT_INFORMATION.deleteAll);

    APP.use('/api/short_information', ROUTER);
};