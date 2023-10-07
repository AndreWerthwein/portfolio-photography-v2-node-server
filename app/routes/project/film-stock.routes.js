module.exports = APP => {
    // import required node-modules
    const FILM_STOCK = require("../../controllers/project/film-stock.controller.js");
    let ROUTER = require("express").Router();

    ROUTER.post("/", FILM_STOCK.create);
    ROUTER.get("/", FILM_STOCK.findAll);
    ROUTER.get("/:name", FILM_STOCK.findOne);
    ROUTER.put("/:id", FILM_STOCK.update);
    ROUTER.delete("/:name", FILM_STOCK.delete);
    ROUTER.delete("/", FILM_STOCK.deleteAll);

    APP.use('/api/film_stock', ROUTER);
};