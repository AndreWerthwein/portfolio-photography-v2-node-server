// the model defines crud-operations for different tables or data models

// import required node-modules
const SQL = require("../database.js");
const CONFIGURATION = require("../../configuration/database.configuration.js");

const MODEL_REFERENCE = (modelReference) => {
    this.id = modelReference.id;
    this.model_id = modelReference.model_id;
    this.name = modelReference.name;
    this.model_kartei = modelReference.model_kartei;
    this.instagram = modelReference.instagram;
};

// create
MODEL_REFERENCE.create = (newModelReference, result) => {
    SQL.query(`INSERT INTO ${CONFIGURATION.DB}.model_reference SET ?`, newModelReference, (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        console.log("Created a new 'model_reference': ", {
            id : res.insertId, ...newModelReference
        });
        result(null, {
            id : res.insertId, ...newModelReference
        });
    });
};

// read (get by Id)
MODEL_REFERENCE.findById = (id, result) => {
    SQL.query(`SELECT * FROM ${CONFIGURATION.DB}.model_reference id = ${id}`, (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Found: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found: 
        result({ kind : "not_found"}, null);
    });
};

// read (all)
MODEL_REFERENCE.getAll = (result) => { 
    SQL.query(`SELECT * FROM ${CONFIGURATION.DB}.model_reference`, (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        console.log("Found: ", res);
        result(null, res);
    });
};

// update:
MODEL_REFERENCE.updateById = (id, modelReference, result) => {
    SQL.query(`UPDATE ${CONFIGURATION.DB}.model_reference SET id = ?, name = ?, model_kartei = ?, instagram = ? WHERE model_id = ?`,
    [modelReference.id, modelReference.name, modelReference.model_kartei, model_reference.instagram], (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind : "not_found" }, null);
            return;
        }
        console.log("Updated: ", { id : id, ...model_reference});
        result(null, { id : id, ...model_reference});
    });
};

// remove
MODEL_REFERENCE.remove = (id, result) => {
    SQL.query(`DELETE FROM ${CONFIGURATION.DB}.model_reference WHERE model_id = ?`, id, (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind : "not_found" }, null);
            return;
        }
        console.log("Deleted: ", id);
        result(null, res);
    });
};

// remove (all)
MODEL_REFERENCE.removeAll = result => {
    SQL.query(`DELETE FROM ${CONFIGURATION.DB}.model_reference`, (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        console.log(`Deleted: ${res.affectedRows}`);
        result(null, res); 
    });
};

module.exports = MODEL_REFERENCE;