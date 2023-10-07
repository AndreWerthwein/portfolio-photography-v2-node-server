const PROJECT_INFORMATION = require("../../models/project/project-information.model.js");

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
    const PROJECT_INFORMATION_INSTANCE = new PROJECT_INFORMATION({
        project_id : req.body.project_id,
        title_original : req.body.title_original,
        title_english : req.body.title_english,
        title_german : req.body.title_german,
        subtitle_original : rq.body.subtitle_original,
        subtitle_english : req.body.subtitle_english,
        subtitle_german : req.body.subtitle_german,
        category_english : req.body.category_english,
        category_german : req.body.category_german,
        description_english : req.body.description_english,
        description_german : req.body.description_german,
        model_id : req.body.model_id,
        date : req.body.date
    });

    // saving object to database
    PROJECT_INFORMATION.create(PROJECT_INFORMATION_INSTANCE, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "An error occurred while creating the 'project_information'-object."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    PROJECT_INFORMATION.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Ab error occurred while retrieving 'project_information'-objects."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findOne = (req, res) => {
    PROJECT_INFORMATION.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'project_information' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while retrieving the 'project_information' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    checkRequest();

    PROJECT_INFORMATION.updateById(req.params.id, new PROJECT_INFORMATION(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'project_information' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while updating the 'project_information' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    PROJECT_INFORMATION.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'project_information' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while updating the 'project_information' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send({
                message : "The 'project_information'-object was deleted successfully."
            });
        }
    });
};

exports.deleteAll = (req, res) => {
    PROJECT_INFORMATION.removeAll((err, data) => {
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