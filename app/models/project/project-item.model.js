// the model defines crud-operations for different tables or data models

// import required node-modules
const SQL = require("../database.js");
const CONFIGURATION = require("../../configuration/database.configuration.js");

const PROJECT_ITEM = (projectItem) => {
    this.id = projectItem.id;
    this.project_id = projectItem.project_id;
    this.category_id = projectItem.category_id;
    this.context = projectItem.context;
    this.title_original = projectItem.title_original;
    this.title_english = projectItem.title_english;
    this.title_german = projectItem.title_german;
    this.microsite = projectItem.microsite;
    this.image = projectItem.image;
    this.date = projectItem.date;
    this.tags = projectItem.tags;
};

// create
PROJECT_ITEM.create = (newProjectItem, result) => {
    SQL.query(`INSERT INTO ${CONFIGURATION.DB}.project_item SET ?`, newProjectItem, (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        console.log("Created a new 'project_item': ", {
            id : res.insertId, ...newProjectItem
        });
        result(null, {
            id : res.insertId, ...newProjectItem
        });
    });
};

// read (get by Id)
PROJECT_ITEM.findById = (id, result) => {
    SQL.query(`SELECT * FROM ${CONFIGURATION.DB}.project_item id = ${id}`, (err, res) => {
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
    SQL.query(`SELECT * FROM ${CONFIGURATION.DB}.project_item`, (err, res) => {
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
PROJECT_ITEM.updateById = (id, projectItem, result) => {
    SQL.query(`UPDATE ${CONFIGURATION.DB}.project_item SET projectItem.project_id = ?, projectItem.category_id = ?, projectItem.context = ?, projectItem.title_original = ?, projectItem.title_english = ?, projectItem.title_german = ?, projectItem.microsite = ?, projectItem.image = ?, projectItem.date = ?, projectItem.tags = ? WHERE id = ?`,
    [projectItem.project_id, projectItem.category_id, projectItem.context, projectItem.title_original, projectItem.title_english, projectItem.title_german, projectItem.microsite, projectItem.image, projectItem.date, projectItem.tags], (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind : "not_found" }, null);
            return;
        }
        console.log("Updated: ", { id : id, ...project_item});
        result(null, { id : id, ...project_item});
    });
};

// remove
PROJECT_ITEM.remove = (id, result) => {
    SQL.query(`DELETE FROM ${CONFIGURATION.DB}.project_item WHERE id = ?`, id, (err, res) => {
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
    SQL.query(`DELETE FROM ${CONFIGURATION.DB}.project_item`, (err, res) => {
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