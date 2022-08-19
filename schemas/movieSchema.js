const mongoose = require("mongoose");
const { Genres, genreSchema } = require("./genreSchema");

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim:true,
    maxlength: 255
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    default: 0,
    min: 0,
  },
  dailyRentalRate: {
    type: Number,
    default: 0,
    min:0
  },
});

const Movies = mongoose.model("Movie", movieSchema);

async function createMovie(title, genre, numberInStock, dailyRentalRate) {
  const movie =  new Movies({
    title,
    genre,
    numberInStock,
    dailyRentalRate,
  });

  const result = await movie.save();
  console.log(result);
}

//createMovie("Terminator", new Genres({name:"sci-fi"}));

module.exports.Movies = Movies;
module.exports.movieSchema = movieSchema;
