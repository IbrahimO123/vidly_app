const express = require("express");
const router = express.Router();
const validateGenre = require("../functions/validateGenres");
const {Genres,} = require("../schemas/genreSchema");

router.use(express.json());

// router.get("/", (req, res) => {
//   res.status(200).send(genres);
// });

router.get("/", (req, res) => {
  async function getGenres() {
    try {
      const getGenres = await Genres.find();
      if (!getGenres) return res.status(404).send("No Genres found...");
      return res.status(200).send(getGenres);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
  getGenres();
});

// router.get("/:id", (req, res) => {
//   const genre = genres.find((g) => g.id === parseInt(req.params.id));
//   if (!genre) res.status(404).send("Genre with the given id not found");
//   else return res.status(200).send(genre);
// });
router.get("/:id", (req, res) => {
  async function getGenre() {
    try {
      const genre = await Genres.findById(req.params.id);
      if (!genre)
        return res.status(404).send("Genre with the given id not found");
      else {
        return res.status(200).send(genre);
      }
    } catch (err) {
      return res.status(404).send(err.message);
    }
  }
  getGenre();
});

// router.post("/", (req, res) => {
//   const genre = {
//     id: genres.length + 1,
//     name: req.body.name,
//     title: req.body.title,
//   };
//   const { error, value } = validateGenre(req.body);
//   if (error) return res.status(400).send(error.details[0].message);
//   else {
//     genres.push(genre);
//     return res.status(200).send(value);
//   }
// });

router.post("/", (req, res) => {
  async function postGenre() {
    try {
      const { error, value } = validateGenre(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      const insertGenre = await Genres.insertMany([req.body]);
      if (!insertGenre) return res.status(400).send("No data inserted");
      return res.status(200).send(insertGenre);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }
  postGenre();
});

// router.put("/:id", (req, res) => {
//   const genre = genres.find((g) => g.id === parseInt(req.params.id));
//   if (!genre)
//     return res.status(404).send("The given genre id is not found in record");
//   const { error, value } = validateGenre(req.body);
//   if (error) return res.status(400).send(error.details[0].message);
//   else {
//     genre.name = req.body.name;
//     genre.title = req.body.title;
//     return res.status(200).send(value);
//   }
// });

router.put("/:id", (req, res) => {
  async function updateGenre() {
    try {
      const { error, value } = validateGenre(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      if (!req.params.id) return res.status(404).send("Insert the required id");
      const updateGenre = await Genres.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (!updateGenre) return res.status(404).send("Insert the correct genre id");
      return res.status(200).send(updateGenre);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
  updateGenre();
});

// router.delete("/:id", (req, res) => {
//   const genre = genres.find((g) => g.id === parseInt(req.params.id));
//   if (!genre)
//     return res.status(404).send("The given genre id is not found in record");
//   else {
//     const index = genres.indexOf(genre);
//     genres.splice(index, 1);
//     return res.status(200).send(genre);
//   }
// });

router.delete("/:id", (req, res) => {
  async function deleteGenre() {
    try {
      const removeGenre = await Genres.findByIdAndRemove(req.params.id);
      if (!removeGenre) { return res.status(404).send("The given genre id is not found in record") }
      return res.status(200).send(removeGenre);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
  deleteGenre();
});

module.exports = router;
