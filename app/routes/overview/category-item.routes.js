module.exports = APP => {
    // import required node-modules
    const CATEGORY_ITEM = require("../../controllers/overview/category-item.controller.js");
    let ROUTER = require("express").Router();

    ROUTER.post("/", CATEGORY_ITEM.create);
    ROUTER.get("/", CATEGORY_ITEM.findAll);
    ROUTER.get("/:name", CATEGORY_ITEM.findOne);
    ROUTER.put("/:id", CATEGORY_ITEM.update);
    ROUTER.delete("/:name", CATEGORY_ITEM.delete);
    ROUTER.delete("/", CATEGORY_ITEM.deleteAll);

    APP.use('/api/category_item', ROUTER);
};