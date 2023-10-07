const SHORT_INFORMATION = require("../../models/page/short-information.model.js");

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
    const SHORT_INFORMATION_INSTANCE = new SHORT_INFORMATION({
        id : req.body.id,
        icon : req.body.icon,
        highlighting : req.body.highlighting,
        disabled : req.body.disabled,
        content_de : req.body.content_de,
        content_en : req.body.content_en,
        tooltip_de : req.body.tooltip_de,
        tooltip_en : req.body.tooltip_en
    });

    // saving object to database
    SHORT_INFORMATION.create(SHORT_INFORMATION_INSTANCE, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "An error occurred while creating the 'short_information'-object."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    SHORT_INFORMATION.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Ab error occurred while retrieving 'short_information'-objects."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findOne = (req, res) => {
    SHORT_INFORMATION.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'short_information' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while retrieving the 'short_information' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    checkRequest();

    SHORT_INFORMATION.updateById(req.params.id, new SHORT_INFORMATION(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'short_information' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while updating the 'short_information' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    SHORT_INFORMATION.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'short_information' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while updating the 'short_information' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send({
                message : "The 'short_information'-object was deleted successfully."
            });
        }
    });
};

exports.deleteAll = (req, res) => {
    SHORT_INFORMATION.removeAll((err, data) => {
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