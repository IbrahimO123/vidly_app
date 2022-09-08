const mongoose = require("mongoose");

const rentalSchema = mongoose.Schema({
  customer: mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxlength: 255,
      minlength: 2,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 50,
    },
  }),
  movie: mongoose.Schema({
    title: {
      type: String,
      minlength: 5,
      maxlength: 255,
      required: true,
      trim: true,
    },
    dailyRentalRate: {
      type: Number,
      minlength: 1,
      maxlength: 255,
      required: true,
    },
  }),
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rentals = mongoose.model("Rental", rentalSchema);

module.exports.Rentals = Rentals;
module.exports.rentalSchema = rentalSchema;
