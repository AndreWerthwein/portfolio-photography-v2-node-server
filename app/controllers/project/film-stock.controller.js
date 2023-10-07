const FILM_STOCK = require("../../models/project/film-stock.model.js");

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
    const FILM_STOCK_INSTANCE = new FILM_STOCK({
        id : req.body.id,
        project_id : req.body.project_id,
        name : req.body.name,
        iso : req.body.iso
    });

    // saving object to database
    FILM_STOCK.create(FILM_STOCK_INSTANCE, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "An error occurred while creating the 'film_stock'-object."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    FILM_STOCK.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Ab error occurred while retrieving 'film_stock'-objects."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findOne = (req, res) => {
    FILM_STOCK.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'film_stock' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while retrieving the 'film_stock' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    checkRequest();

    FILM_STOCK.updateById(req.params.id, new FILM_STOCK(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'film_stock' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while updating the 'film_stock' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    FILM_STOCK.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `No 'film_stock' found with the id: '${req.params.id}'.`
                });
            } else {
                res.status(500).send({
                    message : `An error occurred while updating the 'film_stock' with the id: ${req.params.id}.`
                });
            }
        } else {
            res.send({
                message : "The 'film_stock'-object was deleted successfully."
            });
        }
    });
};

exports.deleteAll = (req, res) => {
    FILM_STOCK.removeAll((err, data) => {
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