// the model defines crud-operations for different tables or data models

// import required node-modules
const SQL = require("../database.js");
const CONFIGURATION = require("../../configuration/database.configuration.js");

const SHORT_INFORMATION = (shortInformation) => {
    this.id = shortInformation.id;
    this.icon = shortInformation.icon;
    this.highlighting = shortInformation.highlighting;
    this.disabled = shortInformation.disabled;
    this.content_de = shortInformation.content_de;
    this.content_en = shortInformation.content_en;
    this.tooltip_de = shortInformation.tooltip_de;
    this.tooltip_en = shortInformation.tooltip_en;
};

// create
SHORT_INFORMATION.create = (newShortInformation, result) => {
    SQL.query(`INSERT INTO ${CONFIGURATION.DB}.short_information SET ?`, newShortInformation, (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        console.log("Created a new 'short_information': ", {
            id : res.insertId, ...newShortInformation
        });
        result(null, {
            id : res.insertId, ...newShortInformation
        });
    });
};

// read (get by Id)
SHORT_INFORMATION.findById = (id, result) => {
    SQL.query(`SELECT * FROM ${CONFIGURATION.DB}.short_information id = ${id}`, (err, res) => {
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
SHORT_INFORMATION.getAll = (result) => { 
    SQL.query(`SELECT * FROM ${CONFIGURATION.DB}.short_information`, (err, res) => {
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
SHORT_INFORMATION.updateById = (id, shortInformation, result) => {
    SQL.query(`UPDATE ${CONFIGURATION.DB}.short_information SET icon = ?, highlighting = ?, disabled = ?, content_de = ?, content_en = ?, tooltip_de = ?, tooltip_en = ? WHERE id = ?`,
    [shortInformation.icon, shortInformation.highlighting, shortInformation.disabled, shortInformation.content_de, shortInformation.content_en, shortInformation.tooltip_de, shortInformation.tooltip_en], (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind : "not_found" }, null);
            return;
        }
        console.log("Updated: ", { id : id, ...short_information});
        result(null, { id : id, ...short_information});
    });
};

// remove
SHORT_INFORMATION.remove = (id, result) => {
    SQL.query(`DELETE FROM ${CONFIGURATION.DB}.short_information WHERE model_id = ?`, id, (err, res) => {
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
SHORT_INFORMATION.removeAll = result => {
    SQL.query(`DELETE FROM ${CONFIGURATION.DB}.short_information`, (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        console.log(`Deleted: ${res.affectedRows}`);
        result(null, res); 
    });
};

module.exports = SHORT_INFORMATION;