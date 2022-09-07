"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const admin = new Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  profileInfo: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("admin", admin);
