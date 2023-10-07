const PROJECT_ITEM = require("../../models/project/project-item.model.js");

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
    const PROJECT_ITEM_INSTANCE = new PROJECT_ITEM({
        id : req.body.id,
        project_id : req.body.project_id,
        category_id : req.body.category_id,
        context : req.body.context,
        title_original : req.body.title_original,
        title_english : req.body.title_english,
        title_german : req.body.title_german,
        microsite : req.body.microsite,
        image : req.body.image,
        date : req.body.date,
        tags : req.body.tags
    });

    // saving object to database
    PROJECT_ITEM.create(PROJECT_ITEM_INSTANCE, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "An error occurred while creating the 'project_item'-object."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    PROJECT_ITEM.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Ab error occurred while retrieving 'project_item'-objects."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findOne = (req, res) => {
    PROJECT_ITEM.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'project_item' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while retrieving the 'project_item' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    checkRequest();

    PROJECT_ITEM.updateById(req.params.id, new PROJECT_ITEM(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'project_item' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while updating the 'project_item' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    PROJECT_ITEM.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'project_item' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while updating the 'project_item' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send({
                message : "The 'project_item'-object was deleted successfully."
            });
        }
    });
};

exports.deleteAll = (req, res) => {
    PROJECT_ITEM.removeAll((err, data) => {
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