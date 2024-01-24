// const crypto = require("crypto");
const axios = require("axios");
const uniqid = require("uniqid");
const { setTimeout } = require("timers");
const {
  calcShipment,
  createOrder,
  generateAWBFunction,
  setPickupFunction,
  generateManifestFunction,
  shipmentDetsFunction,
  cancelShipmentFunction,
  createReturnOrderFunction,
  generateRetAWBFunction,
  generateInvoiceFunction,
  getOrderDetsFunction,
} = require("../../controlllers/ship/shipController");
const express = require("express");

const router = express.Router();

router.post("/calcShipment", calcShipment);

router.post("/createOrder", createOrder);

router.post("/generateAWB", generateAWBFunction);

router.post("/pickup", setPickupFunction);

router.post("/manifest", generateManifestFunction);

router.get("/shipDets", shipmentDetsFunction);

router.post("/cancelShip", cancelShipmentFunction);

router.post("/createRet", createReturnOrderFunction);

router.post("/generateRetAWB", generateRetAWBFunction);

router.post("/generateInvoice", generateInvoiceFunction);

router.get("/orderDets", getOrderDetsFunction);

module.exports = router;
