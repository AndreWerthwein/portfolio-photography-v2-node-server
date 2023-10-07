// the model defines crud-operations for different tables or data models

// import required node-modules
const SQL = require("../database.js");
const CONFIGURATION = require("../../configuration/database.configuration.js");

const PROJECT_SERIES_GALLERY = (projectSeriesGallery) => {
    this.id = projectSeriesGallery.id;
    this.project_id = projectSeriesGallery.project_id;
    this.image = projectSeriesGallery.image;
    this.ascending_order = projectSeriesGallery.ascending_order;
    this.panorama = projectSeriesGallery.panorama;
    this.alt_text = projectSeriesGallery.alt_text;
};

// create
PROJECT_SERIES_GALLERY.create = (newProjectSeriesGallery, result) => {
    SQL.query(`INSERT INTO ${CONFIGURATION.DB}.project_series_gallery SET ?`, newProjectSeriesGallery, (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        console.log("Created a new 'project_series_gallery': ", {
            id : res.insertId, ...newProjectSeriesGallery
        });
        result(null, {
            id : res.insertId, ...newProjectSeriesGallery
        });
    });
};

// read (get by Id)
PROJECT_SERIES_GALLERY.findById = (id, result) => {
    SQL.query(`SELECT * FROM ${CONFIGURATION.DB}.project_series_gallery id = ${id}`, (err, res) => {
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
PROJECT_SERIES_GALLERY.getAll = (result) => { 
    SQL.query(`SELECT * FROM ${CONFIGURATION.DB}.project_series_gallery`, (err, res) => {
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
PROJECT_SERIES_GALLERY.updateById = (id, projectSeriesGallery, result) => {
    SQL.query(`UPDATE ${CONFIGURATION.DB}.project_series_gallery SET projectSeriesGallery.project_id = ?, projectSeriesGallery.image = ?, projectSeriesGallery.ascending_order = ?, projectSeriesGallery.panorama = ?, projectSeriesGallery.alt_text = ? WHERE id = ?`,
    [projectSeriesGallery.project_id, projectSeriesGallery.image, projectSeriesGallery.ascending_order, projectSeriesGallery.panorama, projectSeriesGallery.alt_text], (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind : "not_found" }, null);
            return;
        }
        console.log("Updated: ", { id : id, ...project_series_gallery});
        result(null, { id : id, ...project_series_gallery});
    });
};

// remove
PROJECT_SERIES_GALLERY.remove = (id, result) => {
    SQL.query(`DELETE FROM ${CONFIGURATION.DB}.project_series_gallery WHERE id = ?`, id, (err, res) => {
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
PROJECT_SERIES_GALLERY.removeAll = result => {
    SQL.query(`DELETE FROM ${CONFIGURATION.DB}.project_series_gallery`, (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        console.log(`Deleted: ${res.affectedRows}`);
        result(null, res); 
    });
};

module.exports = PROJECT_SERIES_GALLERY;