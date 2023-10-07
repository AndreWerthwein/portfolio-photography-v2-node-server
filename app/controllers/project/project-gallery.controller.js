const PROJECT_GALLERY = require("../../models/project/project-gallery.model.js");

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
    const PROJECT_GALLERY_INSTANCE = new PROJECT_GALLERY({
        id : req.body.id,
        project_id : req.body.project_id,
        ascending_order : req.body.ascending_order,
        first_image : req.body.first_image,
        first_size : req.body.first_size,
        first_alt_text : req.body.first_alt_text,
        second_image : req.body.second_image,
        second_size : req.body.second_size,
        second_alt_text : req.body.second_alt_text,
        curation : req.body.curation
    });

    // saving object to database
    PROJECT_GALLERY.create(PROJECT_GALLERY_INSTANCE, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "An error occurred while creating the 'project_gallery'-object."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    PROJECT_GALLERY.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Ab error occurred while retrieving 'project_gallery'-objects."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findOne = (req, res) => {
    PROJECT_GALLERY.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'project_gallery' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while retrieving the 'project_gallery' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    checkRequest();

    PROJECT_GALLERY.updateById(req.params.id, new PROJECT_GALLERY(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'project_gallery' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while updating the 'project_gallery' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    PROJECT_GALLERY.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'project_gallery' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while updating the 'project_gallery' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send({
                message : "The 'project_gallery'-object was deleted successfully."
            });
        }
    });
};

exports.deleteAll = (req, res) => {
    PROJECT_GALLERY.removeAll((err, data) => {
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