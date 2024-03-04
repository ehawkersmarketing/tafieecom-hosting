const express = require("express");
const {
    generateEnquiry,
    getEnquiry,
    sendToWhatsapp,
} = require("../../controlllers/enquiry/enquiryController");
const router = express.Router();

router.post("/generateEnquiry", generateEnquiry);
router.get("/getEnquiry", getEnquiry);
router.post("/sendToWhatsapp", sendToWhatsapp);

module.exports = router;