const HERO_IMAGE = require("../../models/overview/hero-image.model.js");

function checkRequest() {
    // validate request
    if (!req.body) {
        res.status(400).send({
            message : "The content of the object to be created can not be empty."
        });
    }
}

exports.create = (req, res) => {
    checkRequest();    

    // create the object to be saved to the database
    const HERO_IMAGE_INSTANCE = new HERO_IMAGE({
        id : req.body.id,
        page_id : req.body.page_id,
        image : req.body.image,
        title_original : req.body.title_original,
        title_translation_de : req.body.title_translation_de,
        title_translation_en : req.body.title_translation_en,
        subtitle_original : req.body.subtitle_original,
        subtitle_translation_de : req.body.subtitle_translation_de,
        subtitle_translation_en : req.body.subtitle_translation_en
    });

    // saving object to database
    HERO_IMAGE.create(HERO_IMAGE_INSTANCE, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "An error occurred while creating the 'hero_image'-object."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    HERO_IMAGE.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Ab error occurred while retrieving 'hero_image'-objects."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findOne = (req, res) => {
    HERO_IMAGE.findById(req.params.page_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'hero_image' found with the id: '${req.params.page_id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while retrieving the 'hero_image' with the id: ${req.params.page_id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    checkRequest();

    HERO_IMAGE.updateById(req.params.page_id, new HERO_IMAGE(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'hero_image' found with the id: '${req.params.page_id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while updating the 'hero_image' with the id: ${req.params.page_id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    HERO_IMAGE.remove(req.params.page_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'hero_image' found with the id: '${req.params.page_id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while updating the 'hero_image' with the id: ${req.params.page_id}.`
                });
            }
        } else {
            res.send({
                message : "The 'hero_image'-object was deleted successfully."
            });
        }
    });
};

exports.deleteAll = (req, res) => {
    HERO_IMAGE.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "An error occurred while emptying table."
            });
        } else {
            res.send({
                message : "The table was successfully emptied."
            });
        }
    });
};