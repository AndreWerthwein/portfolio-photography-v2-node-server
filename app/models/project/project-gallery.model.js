// the model defines crud-operations for different tables or data models

// import required node-modules
const SQL = require("../database.js");
const CONFIGURATION = require("../../configuration/database.configuration.js");

const PROJECT_GALLERY = (projectGallery) => {
    this.id = projectGallery.id;
    this.project_id = projectGallery.project_id;
    this.ascending_order = projectGallery.ascending_order;
    this.first_image = projectGallery.first_image;
    this.first_size = projectGallery.first_size;
    this.first_alt_text = projectGallery.first_alt_text;
    this.second_image = projectGallery.second_image;
    this.second_size = projectGallery.second_size;
    this.second_alt_text = projectGallery.second_alt_text;
    this.curation = projectGallery.curation;
};

// create
PROJECT_GALLERY.create = (newProjectGallery, result) => {
    SQL.query(`INSERT INTO ${CONFIGURATION.DB}.project_gallery SET ?`, newProjectGallery, (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        console.log("Created a new 'project_gallery': ", {
            id : res.insertId, ...newProjectGallery
        });
        result(null, {
            id : res.insertId, ...newProjectGallery
        });
    });
};

// read (get by Id)
PROJECT_GALLERY.findById = (id, result) => {
    SQL.query(`SELECT * FROM ${CONFIGURATION.DB}.project_gallery id = ${id}`, (err, res) => {
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
PROJECT_GALLERY.getAll = (result) => { 
    SQL.query(`SELECT * FROM ${CONFIGURATION.DB}.project_gallery`, (err, res) => {
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
PROJECT_GALLERY.updateById = (id, projectGallery, result) => {
    SQL.query(`UPDATE ${CONFIGURATION.DB}.project_gallery SET projectGallery.project_id = ?, projectGallery.ascending_order = ?, projectGallery.first_image = ?, projectGallery.first_size = ?, projectGallery.first_alt_text = ?, projectGallery.second_image = ?, projectGallery.second_size = ?, projectGallery.second_alt_text = ?, projectGallery.curation = ? WHERE id = ?`,
    [projectGallery.project_id, projectGallery.ascending_order, projectGallery.first_image, projectGallery.first_size, projectGallery.first_alt_text, projectGallery.second_image, projectGallery.second_size, projectGallery.second_alt_text, projectGallery.curation], (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind : "not_found" }, null);
            return;
        }
        console.log("Updated: ", { id : id, ...project_gallery});
        result(null, { id : id, ...project_gallery});
    });
};

// remove
PROJECT_GALLERY.remove = (id, result) => {
    SQL.query(`DELETE FROM ${CONFIGURATION.DB}.project_gallery WHERE id = ?`, id, (err, res) => {
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
PROJECT_GALLERY.removeAll = result => {
    SQL.query(`DELETE FROM ${CONFIGURATION.DB}.project_gallery`, (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        console.log(`Deleted: ${res.affectedRows}`);
        result(null, res); 
    });
};

module.exports = PROJECT_GALLERY;