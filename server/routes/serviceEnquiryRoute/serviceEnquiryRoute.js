const express = require("express");
const {generateServiceEnquiry , getServiceEnquiry ,sendToWhatsapp} = require("../../controlllers/serviceEnquiryController/serviceEnquiry");
const router = express.Router();

router.post("/generateEnquiry", generateServiceEnquiry);
router.get("/getEnquiry", getServiceEnquiry);
router.post("/sendToWhatsapp", sendToWhatsapp);

module.exports = router;
