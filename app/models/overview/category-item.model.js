// the model defines crud-operations for different tables or data models

// import required node-modules
const SQL = require("../database.js");
const CONFIGURATION = require("../../configuration/database.configuration.js");

const CATEGORY_ITEM = (categoryItem) => {
    this.id = categoryItem.id;
    this.name_de = categoryItem.name_de;
    this.name_en = categoryItem.name_en;
    this.description_de = categoryItem.description_de;
    this.description_en = categoryItem.description_en;
    this.image = categoryItem.image;
    this.page = categoryItem.page;
    this.context = categoryItem.context;
};

// create
CATEGORY_ITEM.create = (newCategoryItem, result) => {
    SQL.query(`INSERT INTO ${CONFIGURATION.DB}.category_item SET ?`, newCategoryItem, (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        console.log("Created a new 'category_item': ", {
            id : res.insertId, ...newCategoryItem
        });
        result(null, {
            id : res.insertId, ...newCategoryItem
        });
    });
};

// read (get by Id)
CATEGORY_ITEM.findById = (id, result) => {
    SQL.query(`SELECT * FROM ${CONFIGURATION.DB}.category_item id = ${id}`, (err, res) => {
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
CATEGORY_ITEM.getAll = (result) => { 
    SQL.query(`SELECT * FROM ${CONFIGURATION.DB}.category_item`, (err, res) => {
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
CATEGORY_ITEM.updateById = (id, categoryItem, result) => {
    SQL.query(`UPDATE ${CONFIGURATION.DB}.category_item SET categoryItem.name_de = ?, categoryItem.name_en = ?, categoryItem.description_de = ?, categoryItem.description_en = ?, categoryItem.image = ?, categoryItem.page = ?, categoryItem.context = ? WHERE id = ?`,
    [categoryItem.name_de, categoryItem.name_en, categoryItem.description_de, categoryItem.description_en, categoryItem.image, categoryItem.page, categoryItem.context], (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind : "not_found" }, null);
            return;
        }
        console.log("Updated: ", { id : id, ...category_item});
        result(null, { id : id, ...category_item});
    });
};

// remove
CATEGORY_ITEM.remove = (id, result) => {
    SQL.query(`DELETE FROM ${CONFIGURATION.DB}.category_item WHERE model_id = ?`, id, (err, res) => {
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
CATEGORY_ITEM.removeAll = result => {
    SQL.query(`DELETE FROM ${CONFIGURATION.DB}.category_item`, (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        console.log(`Deleted: ${res.affectedRows}`);
        result(null, res); 
    });
};

module.exports = CATEGORY_ITEM;