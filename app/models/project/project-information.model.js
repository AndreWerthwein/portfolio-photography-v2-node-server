// the model defines crud-operations for different tables or data models

// import required node-modules
const SQL = require("../database.js");
const CONFIGURATION = require("../../configuration/database.configuration.js");

const PROJECT_INFORMATION = (projectInformation) => {
    this.id = projectInformation.id;
    this.project_id = projectInformation.project_id;
    this.title_original = projectInformation.title_original;
    this.title_english = projectInformation.title_english;
    this.title_german = projectInformation.title_german;
    this.subtitle_original = projectInformation.subtitle_original;
    this.subtitle_english = projectInformation.subtitle_english;
    this.subtitle_german = projectInformation.subtitle_german;
    this.category_english = projectInformation.category_english;
    this.category_german = projectInformation.category_german;
    this.description_english = projectInformation.description_english;
    this.description_german = projectInformation.description_german;
    this.model_id = projectInformation.model_id;
    this.date = projectInformation.date;
};

// create
PROJECT_INFORMATION.create = (newProjectInformation, result) => {
    SQL.query(`INSERT INTO ${CONFIGURATION.DB}.project_information SET ?`, newProjectInformation, (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        console.log("Created a new 'project_information': ", {
            id : res.insertId, ...newProjectInformation
        });
        result(null, {
            id : res.insertId, ...newProjectInformation
        });
    });
};

// read (get by Id)
PROJECT_INFORMATION.findById = (id, result) => {
    SQL.query(`SELECT * FROM ${CONFIGURATION.DB}.project_information id = ${id}`, (err, res) => {
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
PROJECT_INFORMATION.getAll = (result) => { 
    SQL.query(`SELECT * FROM ${CONFIGURATION.DB}.project_information`, (err, res) => {
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
PROJECT_INFORMATION.updateById = (id, projectInformation, result) => {
    SQL.query(`UPDATE ${CONFIGURATION.DB}.project_information SET projectInformation.project_id = ?, projectInformation.title_original = ?, projectInformation.title_english = ?, projectInformation.title_german = ?, projectInformation.subtitle_original = ?, projectInformation.subtitle_english = ?, projectInformation.subtitle_german = ?, projectInformation.category_english = ?, projectInformation.category_german = ?, projectInformation.description_english = ?, projectInformation.description_german = ?, projectInformation.model_id = ?, projectInformation.date = ? WHERE id = ?`,
    [projectInformation.project_id, projectInformation.title_original, projectInformation.title_english, projectInformation.title_german, projectInformation.subtitle_original, projectInformation.subtitle_english, projectInformation.subtitle_german, projectInformation.category_english, projectInformation.category_german, projectInformation.description_english, projectInformation.description_german, projectInformation.model_id, projectInformation.date], (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind : "not_found" }, null);
            return;
        }
        console.log("Updated: ", { id : id, ...project_information});
        result(null, { id : id, ...project_information});
    });
};

// remove
PROJECT_INFORMATION.remove = (id, result) => {
    SQL.query(`DELETE FROM ${CONFIGURATION.DB}.project_information WHERE id = ?`, id, (err, res) => {
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
PROJECT_INFORMATION.removeAll = result => {
    SQL.query(`DELETE FROM ${CONFIGURATION.DB}.project_information`, (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        console.log(`Deleted: ${res.affectedRows}`);
        result(null, res); 
    });
};

module.exports = PROJECT_INFORMATION;