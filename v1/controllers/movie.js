const Movie = require("../models/movie");
const response = require("../helpers/response");

exports.getMovies = async function (req, res) {
  try {
    const movies = await Movie.findAll();
    res.status(200).json(movies);
  } catch (err) {
    response.catchError(res, err);
  }
}

exports.getMovie = async function (req, res) {
  try {
    const movie = await Movie.findOne(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    response.catchError(res, err);
  }
}

async function mostRented(req, res, cols, limit = 1) {
  try {
    const movies = await Movie.mostRented(cols, req.params.year, limit);
    res.status(200).json(movies);
  } catch (err) {
    response.catchError(res, err);
  }
}

exports.getTop100 = async function (req, res) {
  await mostRented(req, res, "*", 100);
}

exports.getMostRented = async function (req, res) {
  await mostRented(req, res, "*");
}

exports.getBestAuthor = async function (req, res) {
  await mostRented(req, res, "auteur AS author");
}

exports.getMoviesByTitle = async function (req, res) {
  try {
    const movies = await Movie.titleSearch(req.params.title);
    res.status(200).json(movies);
  } catch (err) {
    response.catchError(res, err);
  }
}

exports.incrementRentedNumber = async function (req, res) {
  try {
    await Movie.incrementRentedNumber(req.body.title, req.body.year);
    res.status(200).json({ message: "Rented number updated" });
  } catch (err) {
    response.catchError(res, err);
  }
};

exports.create = async function (req, res) {
  try {
    const movieId = await Movie.create(req.body);
    res.status(201).json({ id: movieId });
  } catch (err) {
    response.catchError(res, err);
  }
}