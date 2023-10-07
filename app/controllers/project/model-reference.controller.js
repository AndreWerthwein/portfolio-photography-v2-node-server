const MODEL_REFERENCE = require("../../models/project/model-reference.model.js");

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
    const MODEL_REFERENCE_INSTANCE = new MODEL_REFERENCE({
        id : req.body.id,
        model_id : req.body.model_id,
        name : req.body.name,
        model_kartei : req.body.model_kartei,
        instagram : req.body.instagram
    });

    // saving object to database
    MODEL_REFERENCE.create(MODEL_REFERENCE_INSTANCE, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "An error occurred while creating the 'model_reference'-object."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    MODEL_REFERENCE.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Ab error occurred while retrieving 'model_reference'-objects."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findOne = (req, res) => {
    MODEL_REFERENCE.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'model_reference' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while retrieving the 'model_reference' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    checkRequest();

    MODEL_REFERENCE.updateById(req.params.id, new MODEL_REFERENCE(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'model_reference' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while updating the 'model_reference' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    MODEL_REFERENCE.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'model_reference' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while updating the 'model_reference' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send({
                message : "The 'model_reference'-object was deleted successfully."
            });
        }
    });
};

exports.deleteAll = (req, res) => {
    MODEL_REFERENCE.removeAll((err, data) => {
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