"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contact = new Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  phoneNo: {
    type: String,
    default: "",
  },
  subject: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("contact", contact);
