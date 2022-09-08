const express = require("express");
const router = express.Router();
const validateRentals = require("../functions/validateRentals");
const { Rentals } = require("../schemas/rentalSchema");
const { Customers } = require("../schemas/customerSchema");
const { Movies } = require("../schemas/movieSchema");

router.use(express.json());

router.get("/", async (req, res) => {
  const getRentals = await Rentals.find();
  if (!getRentals)
    return res.status(404).send("No Rental record in the database");
  return res.status(200).send(getRentals);
});

router.get("/:id", async (req, res) => {
  const getRental = await Rentals.findById(req.params.id);

  if (!getRental)
    return res.status(404).send("The rental with the given ID was not found.");
  return res.send(getRental);
});

router.post("/", async (req, res) => {
  const { error, value } = validateRentals(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const getCustomer = await Customers.findById(req.body.customerId);
  if (!getCustomer) return res.status(400).send("Invalid customer.");

  const getMovie = await Movies.findById(req.body.movieId);
  if (!getMovie) return res.status(400).send("Invalid movie.");

  if (getMovie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  let rental = new Rentals({
    customer: {
      _id: getCustomer._id,
      name: getCustomer.name,
      phone: getCustomer.phone,
    },
    movie: {
      _id: getMovie._id,
      title: getMovie.title,
      dailyRentalRate: getMovie.dailyRentalRate,
    },
  });
  rental = await rental.save();

  getMovie.numberInStock--;
  getMovie.save();

  res.send(rental);
});

router.post("/", async (req, res) => {
  const { error, value } = validateRentals(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const getCustomer = await Customers.findById(req.body.customerId);
  if (!getCustomer) return res.status(400).send("Invalid customer.");

  const getMovie = await Movies.findById(req.body.movieId);
  if (!getMovie) return res.status(400).send("Invalid movie.");

  if (getMovie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  let rental = new Rentals({
    customer: {
      _id: getCustomer._id,
      name: getCustomer.name,
      phone: getCustomer.phone,
    },
    movie: {
      _id: getMovie._id,
      title: getMovie.title,
      dailyRentalRate: getMovie.dailyRentalRate,
    },
    //    dateOut : req.body.dateOut,
    //    dateReturned : req.body.dateReturned,
    //    rentalFree : req.body.rentalFree
  });
  rental = await rental.save();

  getMovie.numberInStock--;
  getMovie.save();

  res.send(rental);
});

router.put("/:id", async (req, res) => {
  const updateRental = await Rentals.findByIdAndUpdate(req.params.id);
  if (!updateRental) return res.status(404).send("Rental not found");
  updateRental.dateOut = req.body.dateOut;
  updateRental.dateReturned = req.body.dateReturned;
  updateRental.rentalFree = req.body.rentalFree;
  const result = await updateRental.save();
  return res.status(200).send(result);
});

router.delete("/:id", async (req, res) => {
  const removeRental = await Rentals.findByIdAndRemove(req.params.id);
  if (!removeRental) {
    return res.status(404).send(`Movie not found`);
  }
  return res.status(200).send(removeRental);
});

module.exports = router;
