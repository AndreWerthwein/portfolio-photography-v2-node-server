// the model defines crud-operations for different tables or data models

// import required node-modules
const SQL = require("../database.js");
const CONFIGURATION = require("../../configuration/database.configuration.js");

const PROJECT_ITEM = (projectLocation) => {
    this.id = projectLocation.id;
    this.project_id = projectLocation.project_id;
    this.location_detail = projectLocation.location_detail;
    this.location_city = projectLocation.location_city;
    this.location_state = projectLocation.location_state;
    this.location_country_english = projectLocation.location_country_english;
    this.location_country_german = projectLocation.location_country_german;
};

// create
PROJECT_ITEM.create = (newProjectLocation, result) => {
    SQL.query(`INSERT INTO ${CONFIGURATION.DB}.project_location SET ?`, newProjectLocation, (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        console.log("Created a new 'project_location': ", {
            id : res.insertId, ...newProjectLocation
        });
        result(null, {
            id : res.insertId, ...newProjectLocation
        });
    });
};

// read (get by Id)
PROJECT_ITEM.findById = (id, result) => {
    SQL.query(`SELECT * FROM ${CONFIGURATION.DB}.project_location id = ${id}`, (err, res) => {
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
PROJECT_ITEM.getAll = (result) => { 
    SQL.query(`SELECT * FROM ${CONFIGURATION.DB}.project_location`, (err, res) => {
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
PROJECT_ITEM.updateById = (id, projectLocation, result) => {
    SQL.query(`UPDATE ${CONFIGURATION.DB}.project_location SET projectLocation.id = ?, projectLocation.project_id = ?, projectLocation.location_detail = ?, projectLocation.location_city = ?, projectLocation.location_state = ?, projectLocation.location_country_english = ?, projectLocation.location_country_german = ? WHERE id = ?`,
    [projectLocation.id, projectLocation.project_id, projectLocation.location_detail, projectLocation.location_city, projectLocation.location_state, projectLocation.location_country_english, projectLocation.location_country_german], (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind : "not_found" }, null);
            return;
        }
        console.log("Updated: ", { id : id, ...project_location});
        result(null, { id : id, ...project_location});
    });
};

// remove
PROJECT_ITEM.remove = (id, result) => {
    SQL.query(`DELETE FROM ${CONFIGURATION.DB}.project_location WHERE id = ?`, id, (err, res) => {
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
PROJECT_ITEM.removeAll = result => {
    SQL.query(`DELETE FROM ${CONFIGURATION.DB}.project_location`, (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        console.log(`Deleted: ${res.affectedRows}`);
        result(null, res); 
    });
};

module.exports = PROJECT_ITEM;