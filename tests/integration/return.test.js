const moment = require("moment");
const { Rentals } = require("../../schemas/rentalSchema");
const { Users } = require("../../schemas/userSchema");
const { Movies } = require("../../schemas/movieSchema");
const request = require("supertest");
const mongoose = require("mongoose");
let server;
let customerId;
let movieId;
let rental;
let token;
let movie;
describe("/api/returns", () => {
  const exec = () => {
    return request(server)
      .post("/api/returns")
      .set("x-jwt-token", token)
      .send({ customerId, movieId });
  };
  beforeEach(async () => {
    server = require("../../app");
    token = new Users().generateToken();
    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();
    movie = new Movies({
      _id: movieId,
      title: "A man who knew Infinity",
      dailyRentalRate: 5,
      genre: {
        name: "True life Story",
      },
      numberInStock: 15,
    });
    await movie.save();
    rental = new Rentals({
      customer: { _id: customerId, name: "Ibrahim", phone: "090653466374" },
      movie: {
        _id: movieId,
        title: "Red Notice",
        dailyRentalRate: 5,
      },
    });
    await rental.save();
  });
  afterEach(async () => {
    server.close();
    await Rentals.deleteMany({});
    await Movies.deleteMany({});
  });

  it("should return 401 if client us not logged in", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });
  it("should return 400 if customerId is not provided", async () => {
    customerId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 400 if movieId is not provided", async () => {
    movieId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 404 if no rental is found for the customer", async () => {
    await Rentals.deleteOne({ "customer.id": customerId });
    const res = await exec();
    expect(res.status).toBe(404);
  });

  it("should return 400 if rental is already processed", async () => {
    rental.dateReturned = new Date();
    await rental.save();
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it("should return 200 if request is valid", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });

  it("should set the returned date if input is valid", async () => {
    const res = await exec();
    const rentalInDb = await Rentals.findById(rental._id);
    const diff = new Date() - rentalInDb.dateReturned;
    expect(diff).toBeLessThan(10 * 1000);
  });
  it("Calculate the rental fee if input is valid", async () => {
    rental.dateOut = moment().add(-7, "days").toDate();
    await rental.save();
    const res = await exec();
    const rentalInDb = await Rentals.findById(rental._id);
    expect(rentalInDb.rentalFee).toBeDefined();
  });

  it("Expect the number in stock should increase if input is valid", async () => {
    const res = await exec();
    const movieInDb = await Movies.findById(movieId);
    expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
  });
  it("Return the rental if input is valid", async () => {
    const res = await exec();
    const rentalInDb = await Rentals.findById(rental._id);
    expect(res.body).toHaveProperty("dateReturned");
    expect(res.body).toHaveProperty("movie");
    expect(res.body).toHaveProperty("customer");
    expect(res.body).toHaveProperty("dateOut");
    expect(res.body).toHaveProperty("rentalFee");

    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining([
        "dateOut",
        "rentalFee",
        "customer",
        "movie",
        "dateReturned",
      ])
    );
  });
});
