const express = require("express");
const router = express.Router();
const validateMovies = require("../functions/valiadteMovies");
const { Genres } = require("../schemas/genreSchema");
const { Movies } = require("../schemas/movieSchema");

router.use(express.json());

router.get("/", async (req, res) => {
  const getMovies = await Movies.find();
  if (!getMovies) {
    return res.status(404).send(`No Movies not found`);
  }
  return res.status(200).send(getMovies);
});

router.get("/:id", async (req, res) => {
  const getMovie = await Movies.findById(req.params.id);
  if (!getMovie) {
    return res.status(404).send("No movie with the given id");
  }
  return res.status(200).send(getMovie);
});

router.post("/", async (req, res) => {
  const { error, value } = await validateMovies(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  const genre = await Genres.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre Id sent..");

  const newMovie = new Movies({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  if (!newMovie) return res.status(404).send("No movie passed to req body");
  const result = await newMovie.save();
  return res.status(200).send(result);
});

router.put("/:id", async (req, res) => {
  const { error, value } = validateMovies(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  const genre = await Genres.findById(req.body.genreId);
  if (!genre) return res.status(400).send("The update required a valid genre");
  const updateMovie = await Movies.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  if (!updateMovie) return res.status(404).send(`Movie not found to update`);
  const result = await updateMovie.save();
  return res.status(200).send(result);
});

router.delete("/:id", async (req, res) => {
  const removeMovie = await Movies.findByIdAndRemove(req.params.id);
  if (!removeMovie) {
    return res.status(404).send(`Movie not found`);
  }
  return res.status(200).send(removeMovie);
});

module.exports = router;
