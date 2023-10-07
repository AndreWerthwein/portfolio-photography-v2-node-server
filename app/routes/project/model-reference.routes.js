module.exports = APP => {
    // import required node-modules
    const MODEL_REFERENCE = require("../../controllers/project/model-reference.controller.js");
    let ROUTER = require("express").Router();

    ROUTER.post("/", MODEL_REFERENCE.create);
    ROUTER.get("/", MODEL_REFERENCE.findAll);
    ROUTER.get("/:name", MODEL_REFERENCE.findOne);
    ROUTER.put("/:id", MODEL_REFERENCE.update);
    ROUTER.delete("/:name", MODEL_REFERENCE.delete);
    ROUTER.delete("/", MODEL_REFERENCE.deleteAll);

    APP.use('/api/model_reference', ROUTER);
};