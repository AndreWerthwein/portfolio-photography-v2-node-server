const PROJECT_SERIES_GALLERY = require("../../models/project/project-series-gallery.model.js");

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
    const PROJECT_SERIES_GALLERY_INSTANCE = new PROJECT_SERIES_GALLERY({
        id : req.body.id,
        project_id : req.body.project_id,
        image : req.body.image,
        ascending_order : req.body.ascending_order,
        panorama : req.body.panorama,
        alt_text : req.body.alt_text
    });

    // saving object to database
    PROJECT_SERIES_GALLERY.create(PROJECT_SERIES_GALLERY_INSTANCE, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "An error occurred while creating the 'project_series_gallery'-object."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    PROJECT_SERIES_GALLERY.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Ab error occurred while retrieving 'project_series_gallery'-objects."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findOne = (req, res) => {
    PROJECT_SERIES_GALLERY.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'project_series_gallery' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while retrieving the 'project_series_gallery' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    checkRequest();

    PROJECT_SERIES_GALLERY.updateById(req.params.id, new PROJECT_SERIES_GALLERY(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'project_series_gallery' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while updating the 'project_series_gallery' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    PROJECT_SERIES_GALLERY.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'project_series_gallery' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while updating the 'project_series_gallery' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send({
                message : "The 'project_series_gallery'-object was deleted successfully."
            });
        }
    });
};

exports.deleteAll = (req, res) => {
    PROJECT_SERIES_GALLERY.removeAll((err, data) => {
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