const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  isGold: {
    type: Boolean,
    required: true,
    default: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 80,
  },
  phone: {
    type: String,
    minlength:11,
    maxlength:14,
    required: {
      validate: {
        validator: function () {
          return this.name;
        },
        message: "Phone number is required...",
      },
    },
  },
  email : {
    type: String,
    required: true,
  }

});

const Customers = mongoose.model("Customer", customerSchema);


module.exports.Customers = Customers;
module.exports.customerSchema = customerSchema;