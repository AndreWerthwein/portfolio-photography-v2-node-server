// the model defines crud-operations for different tables or data models

// import required node-modules
const SQL = require("../database.js");
const CONFIGURATION = require("../../configuration/database.configuration.js");

const HERO_IMAGE = (heroImage) => {
    this.id = heroImage.id;
    this.page_id = heroImage.page_id;
    this.image = heroImage.image;
    this.title_original = heroImage.title_original;
    this.title_translation_de = heroImage.title_translation_de;
    this.title_translation_en = heroImage.title_translation_en;
    this.subtitle_original = heroImage.subtitle_original;
    this.subtitle_translation_de = heroImage.subtitle_translation_de;
    this.subtitle_translation_en = heroImage.subtitle_translation_en;
};

// create
HERO_IMAGE.create = (newHeroImage, result) => {
    SQL.query(`INSERT INTO ${CONFIGURATION.DB}.hero_image SET ?`, newHeroImage, (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        console.log("Created a new 'hero_image': ", {
            id : res.insertId, ...newHeroImage
        });
        result(null, {
            id : res.insertId, ...newHeroImage
        });
    });
};

// read (get by Id)
HERO_IMAGE.findById = (id, result) => {
    SQL.query(`SELECT * FROM ${CONFIGURATION.DB}.hero_image page_id = ${id}`, (err, res) => {
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
HERO_IMAGE.getAll = (result) => { 
    SQL.query(`SELECT * FROM ${CONFIGURATION.DB}.hero_image`, (err, res) => {
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
HERO_IMAGE.updateById = (id, heroImage, result) => {
    SQL.query(`UPDATE ${CONFIGURATION.DB}.hero_image SET id = ?, image = ?, title_original = ?, title_translation_de = ?, title_translation_en = ?, subtitle_original = ?, subtitle_translation_de = ?, subtitle_translation_en = ? WHERE page_id = ?`,
    [heroImage.id, heroImage.image, heroImage.title_original, heroImage.title_translation_de, heroImage.title_translation_en, heroImage.subtitle_original, heroImage.subtitle_translation_de, heroImage.subtitle_translation_en], (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind : "not_found" }, null);
            return;
        }
        console.log("Updated: ", { id : id, ...hero_image});
        result(null, { id : id, ...hero_image});
    });
};

// remove
HERO_IMAGE.remove = (id, result) => {
    SQL.query(`DELETE FROM ${CONFIGURATION.DB}.hero_image WHERE page_id = ?`, id, (err, res) => {
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
HERO_IMAGE.removeAll = result => {
    SQL.query(`DELETE FROM ${CONFIGURATION.DB}.hero_image`, (err, res) => {
        if (err) {
            console.log("[ERROR]: ", err);
            result(err, null);
            return;
        }
        console.log(`Deleted: ${res.affectedRows}`);
        result(null, res); 
    });
};

module.exports = HERO_IMAGE;