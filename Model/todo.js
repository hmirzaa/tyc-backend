"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const todo = new Schema({}, { strict: false });
module.exports = mongoose.model("Todo", todo);