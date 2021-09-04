const db = require("../../db");
const response = require("../helpers/response");
const validations = require("../validations/movie");
const tools = require('../../tools');

exports.findAll = async function () {
    const results = await db.query("SELECT * FROM movie");
    return results[0];
}

exports.findOne = async function (id) {
    const result = await db.query("SELECT * FROM movie WHERE id=?", id);
    if (!result[0][0]) {
        throw response.error(404, "Movie not found");
    }
    return result[0][0];
}

async function mostRented(cols = "*", year, limit = 1) {
    let results;
    if (year) {
        results = await db.query("SELECT " + cols + " FROM movie WHERE annee=? ORDER BY nbre_de_prets DESC LIMIT " + limit, year);
    } else {
        results = await db.query("SELECT " + cols + " FROM movie ORDER BY nbre_de_prets DESC LIMIT " + limit);
    }
    return limit > 1 ? results[0] : results[0][0];
}

exports.mostRented = async function (cols, year, limit) {
    return await mostRented(cols, year, limit);
}

exports.titleSearch = async function (title) {
    
    const results = await db.query("SELECT * FROM movie WHERE titre LIKE ?", "%" + title + "%");
    return results[0];
}

exports.incrementRentedNumber = async function (title, year) {
    if (!title || !year) {
        throw response.error(400, "title and year are required");
    }

    // Check if the movie exists
    const [rows] = await db.query("SELECT COUNT(*) AS total FROM movie WHERE titre=? AND annee=?", [title, year]);
    if (rows[0].total < 1) {
        throw response.error(404, "Movie not found");
    }

    await db.query("UPDATE movie SET nbre_de_prets = nbre_de_prets + 1 WHERE titre=? AND annee=?",
        [title, year]);
}

exports.create = async function(body) {
    const errors = validations.valid(body);
    if (!tools.isEmpty(errors)) {
        throw response.error(400, "Invalid parameters", errors);
    }

    const newMovie = await db.query("INSERT INTO movie(annee, nbre_de_prets, titre, auteur, editeur, indice, bib, cote, cat_1, cat_2) " + 
    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
    [body.year, body.rent_number, body.title, body.author, body.editor, body.index, body.bib, body.ref, body.cat1, body.cat2]);
    
    return newMovie[0].insertId;
}

