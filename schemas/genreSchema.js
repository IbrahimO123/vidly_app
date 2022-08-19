const mongoose = require("mongoose");

const genreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
});

const Genres = mongoose.model("Genre", genreSchema);

async function createGenres() {
  try {
    const genres = new Genres([
      { name: "horror", title: "Holiday" },
      { name: "comedy", title: "Piral" },
      { name: "action", title: "Dinosaur" },
      { name: "adventure", title: "Journal" },
      { name: "romance", title: "Art" },
    ]);
    console.log(genres);
  } catch (err) {
    console.error(err.message);
  }
}

const runfunction = (function () {
  var executed = false;
  return function () {
    if (!executed) {
      executed = true;
      createGenres();
    }
  };
})();

//runfunction();

module.exports.Genres = Genres;
module.exports.genreSchema = genreSchema;
