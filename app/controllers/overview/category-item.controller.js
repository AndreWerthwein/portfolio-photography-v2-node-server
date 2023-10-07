const CATEGORY_ITEM = require("../../models/overview/category-item.model.js");

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
    const CATEGORY_ITEM_INSTANCE = new CATEGORY_ITEM({
        id : req.body.id,
        name_de : req.body.name_de,
        name_en : req.body.name_en,
        description_de : req.body.description_de,
        description_en : req.body.description_en,
        image : req.body.image,
        page : req.body.page,
        context : req.body.context
    });

    // saving object to database
    CATEGORY_ITEM.create(CATEGORY_ITEM_INSTANCE, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "An error occurred while creating the 'category_item'-object."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    CATEGORY_ITEM.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Ab error occurred while retrieving 'category_item'-objects."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findOne = (req, res) => {
    CATEGORY_ITEM.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'category_item' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while retrieving the 'category_item' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    checkRequest();

    CATEGORY_ITEM.updateById(req.params.id, new CATEGORY_ITEM(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'category_item' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while updating the 'category_item' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    CATEGORY_ITEM.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'category_item' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while updating the 'category_item' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send({
                message : "The 'category_item'-object was deleted successfully."
            });
        }
    });
};

exports.deleteAll = (req, res) => {
    CATEGORY_ITEM.removeAll((err, data) => {
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