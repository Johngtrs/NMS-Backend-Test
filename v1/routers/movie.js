const express = require("express");
const router = express.Router();
const movie = require("../controllers/movie");

// GET
router.get("/movies", movie.getMovies);
router.get("/movies/top100", movie.getTop100);
router.get("/movies/top100/:year", movie.getTop100);
router.get("/movies/most_rented", movie.getMostRented);
router.get("/movies/most_rented/:year", movie.getMostRented);
router.get("/movies/best_author", movie.getBestAuthor);
router.get("/movies/search/:title", movie.getMoviesByTitle);
router.get("/movies/:id", movie.getMovie);

// POST
router.post("/movies", movie.create);

// PATCH
router.patch("/movies/increment_rented", movie.incrementRentedNumber);

module.exports = router;