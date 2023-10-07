// the model defines crud-operations for different tables or data models

// import required node-modules
const SQL = require("../database.js");
const CONFIGURATION = require("../../configuration/database.configuration.js");

const FILM_STOCK = (filmStock) => {
    this.id = filmStock.id;
    this.project_id = filmStock.project_id;
    this.name = filmStock.name;
    this.iso = filmStock.iso;
};

// create
FILM_STOCK.create = (newFilmStock, result) => {
    SQL.query(`INSERT INTO ${CONFIGURATION.DB}.film_stock SET ?`, newFilmStock, (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        console.log("Created a new 'film_stock': ", {
            id : res.insertId, ...newFilmStock
        });
        result(null, {
            id : res.insertId, ...newFilmStock
        });
    });
};

// read (get by Id)
FILM_STOCK.findById = (id, result) => {
    SQL.query(`SELECT * FROM ${CONFIGURATION.DB}.film_stock id = ${id}`, (err, res) => {
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
FILM_STOCK.getAll = (result) => { 
    SQL.query(`SELECT * FROM ${CONFIGURATION.DB}.film_stock`, (err, res) => {
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
FILM_STOCK.updateById = (id, filmStock, result) => {
    SQL.query(`UPDATE ${CONFIGURATION.DB}.film_stock SET project_id = ?, name = ?, iso = ? WHERE model_id = ?`,
    [filmStock.project_id, filmStock.name, filmStock.iso], (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind : "not_found" }, null);
            return;
        }
        console.log("Updated: ", { id : id, ...film_stock});
        result(null, { id : id, ...film_stock});
    });
};

// remove
FILM_STOCK.remove = (id, result) => {
    SQL.query(`DELETE FROM ${CONFIGURATION.DB}.film_stock WHERE project_id = ?`, id, (err, res) => {
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
FILM_STOCK.removeAll = result => {
    SQL.query(`DELETE FROM ${CONFIGURATION.DB}.film_stock`, (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        console.log(`Deleted: ${res.affectedRows}`);
        result(null, res); 
    });
};

module.exports = FILM_STOCK;