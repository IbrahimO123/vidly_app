const express = require("express");
const moment = require("moment");
const router = express.Router();
const authWare = require("../middleware/authWare")
const { Rentals, rentalSchema } = require("../schemas/rentalSchema");
const { Movies, } = require("../schemas/movieSchema");
router.use(express.json());

router.post("/", authWare, async (req, res) => {
  if (!req.body.customerId)
    return res.status(400).send("Customer Id not provided");
  if (!req.body.movieId) return res.status(400).send("Movie Id not provided");
  const rental = await Rentals.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId,
  });
  if (!rental)
    return res.status(404).send("Rental not found for the given customer Id");
  if (rental.dateReturned) return res.status(400).send("Rental already in process...");
    rental.dateReturned = new Date();
    rental.rentalFee = moment().diff(rental.dateOut, 'days') * rental.movie.dailyRentalRate
    await rental.save();
    await Movies.updateOne({_id:rental.movie._id}, {
        $inc : {numberInStock : 1}
    });
    
    return res.status(200).send(rental)
});

module.exports = router;
