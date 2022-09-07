"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const notification = new Schema({
  senderId: {
    type: String,
    default: "",
  },
  recieverId: {
    type: String,
    default: "",
  },
  requestId: {
    type: mongoose.Types.ObjectId,
  },
  requerementId: {
    type: mongoose.Types.ObjectId,
  },
});
