"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const payment = new Schema({
  requestId: {
    type: String,
    default: "",
  },
  senderName: {
    type: String,
    default: "",
  },
  senderId: {
    type: String,
    default: "",
  },
  recieverId: {
    type: String,
    default: "",
  },
  recieverName: {
    type: String,
    default: "",
  },
  paymentType: {
    type: String,
    default: "",
  },
  amount: {
    type: String,
    default: "",
  },
  paymentstatus: {
    type: String,
    default: "",
  },
  senderCompany: {
    type: String,
    default: "",
  },
  recieverCompany: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("Payment", payment);
