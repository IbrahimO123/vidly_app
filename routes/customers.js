const express = require("express");
const router = express.Router();
const validateCustomer = require("../functions/validateCustomers");
const authWare = require("../middleware/authWare");
const { Customers } = require("../schemas/customerSchema");

router.use(express.json());

router.get("/", async (req, res) => {
  const getCustomers = await Customers.find();
  if (!getCustomers)
    return res.status(404).send("No Database found for customers");
  res.status(200).send(getCustomers);
});

router.get("/:id", async (req, res) => {
  const getCustomer = await Customers.findById(req.params.id);
  if (!getCustomer)
    return res.status(404).send("Customer with the given id not found");
  else {
    return res.status(200).send(getCustomer);
  }
});

router.post("/", async (req, res) => {
  const { error, value } = validateCustomer(req.body);
  if (error) return res.status(404).send(error.message);
  const insertCustomer = await Customers.insertMany([req.body]);
  if (!insertCustomer)
    return res.status(404).send("No database exists for customers");
  return res.status(200).send(insertCustomer);
});

router.put("/:id", authWare, async (req, res) => {
  const { error, value } = validateCustomer(req.body);
  if (error) return res.status(404).send(error.message);
  if (!req.params.id) return res.status(404).send("Insert the required id");
  const updateCustomer = await Customers.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  if (!updateCustomer) return res.status(404).send("Customer not found");
  return res.status(200).send(updateCustomer);
});

router.delete("/:id", authWare, async (req, res) => {
  const removeCustomer = await Customers.findByIdAndRemove(req.params.id);
  if (!removeCustomer) return res.status(404).send("Customer not found");
  return res.status(200).send(removeCustomer);
});

module.exports = router;
