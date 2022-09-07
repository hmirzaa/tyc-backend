"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const issue = new Schema({
  senderId: {
    type: String,
    default: "",
  },
  senderEmail: {
    type: String,
    default: "",
  },
  senderPhone: {
    type: Number,
    default: 0,
  },
  senderName: {
    type: String,
    default: "",
  },
  againstName: {
    type: String,
    default: "",
  },
  againstPhone: {
    type: Number,
    default: 0,
  },
  againstEmail: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("issue", issue);
