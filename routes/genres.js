const express = require("express");
const router = express.Router();
const validateGenre = require("../functions/validateGenres");
const { Genres } = require("../schemas/genreSchema");
const authWare = require("../middleware/authWare");
const isAdmin = require("../middleware/isAdmin");
const validObjectId = require("../middleware/validObjectId");

router.use(express.json());

router.get("/", async (req, res) => {
  const getGenres = await Genres.find();
  if (!getGenres) return res.status(401).send("No Genres found...");
  return res.status(200).send(getGenres);
});

router.get("/:id",validObjectId, async (req, res) => {
  const genre = await Genres.findById(req.params.id);
  if (!genre) return res.status(404).send("Genre with the given id not found");
  return res.status(200).send(genre);
});

router.post("/", authWare, async (req, res) => {
  const { error, value } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const insertGenre = await Genres.insertMany([req.body]);
  if (!insertGenre) return res.status(500).send("No data inserted");
  return res.status(200).send(insertGenre);
});

router.put("/:id", authWare, async (req, res) => {
  const { error, value } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (!req.params.id) return res.status(404).send("Insert the required id");
  const updateGenre = await Genres.findByIdAndUpdate(req.params.id, req.body);
  if (!updateGenre) return res.status(404).send("Insert the correct genre id");
  return res.status(200).send(updateGenre);
});

router.delete("/:id", [authWare, isAdmin], async (req, res) => {
  const removeGenre = await Genres.findByIdAndRemove(req.params.id);
  if (!removeGenre) {
    return res.status(404).send("The given genre id is not found in record");
  }
  return res.status(200).send(removeGenre);
});

module.exports = router;
