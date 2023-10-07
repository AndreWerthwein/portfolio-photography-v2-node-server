const PROJECT_LOCATION = require("../../models/project/project-location.model.js");

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
    const PROJECT_LOCATION_INSTANCE = new PROJECT_LOCATION({
        id : req.body.id,
        project_id : req.body.project_id,
        location_detail : req.body.location_detail,
        location_city : req.body.location_city,
        location_state : req.body.location_state,
        location_country_english : req.body.location_country_english,
        location_country_german : req.body.location_country_german
    });

    // saving object to database
    PROJECT_LOCATION.create(PROJECT_LOCATION_INSTANCE, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "An error occurred while creating the 'project_location'-object."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    PROJECT_LOCATION.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Ab error occurred while retrieving 'project_location'-objects."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findOne = (req, res) => {
    PROJECT_LOCATION.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'project_location' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while retrieving the 'project_location' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    checkRequest();

    PROJECT_LOCATION.updateById(req.params.id, new PROJECT_LOCATION(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'project_location' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while updating the 'project_location' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    PROJECT_LOCATION.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'project_location' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while updating the 'project_location' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send({
                message : "The 'project_location'-object was deleted successfully."
            });
        }
    });
};

exports.deleteAll = (req, res) => {
    PROJECT_LOCATION.removeAll((err, data) => {
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