const express = require("express");
const router = express.Router();
const validateCustomer = require("../functions/validateCustomers");
const {Customers,} = require("../schemas/customerSchema");

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const getCustomers = await Customers.find();
    if (!getCustomers)
      return res.status(404).send("No Database found for customers");
    res.status(200).send(getCustomers);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const getCustomer = await Customers.findById(req.params.id);
    if (!getCustomer)
      return res.status(404).send("Customer with the given id not found");
    else {
      return res.status(200).send(getCustomer);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { error, value } = validateCustomer(req.body);
    if (error) return res.status(404).send(error.message);
    const insertCustomer = await Customers.insertMany([req.body]);
    if(!insertCustomer) return res.status(404).send("No database exists for customers");
    return res.status(200).send(insertCustomer);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error, value } = validateCustomer(req.body);
    if (error) return res.status(404).send(error.message);
    if (!req.params.id) return res.status(404).send("Insert the required id");
    const updateCustomer = await Customers.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!updateCustomer) return res.status(404).send("Customer not found");
    return res.status(200).send(updateCustomer);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removeCustomer = await Customers.findByIdAndRemove(req.params.id);
    if(!removeCustomer) return res.status(404).send("Customer not found")
    return res.status(200).send(removeCustomer);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

module.exports = router;
