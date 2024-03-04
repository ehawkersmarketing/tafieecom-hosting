const enquiryModel = require("../../models/enquiryModel/enquiryModel");
const axios = require('axios');

exports.generateEnquiry = async (req, res) => {
  try {
    const { name, mobile, email, message } = req.body;
    const newEnquiry = new enquiryModel({
      name,
      mobile,
      email,
      message,
    });
    await newEnquiry.save();
    return res.status(200).send({
      success: true,
      message: "Enquiry sent successfully",
      newEnquiry,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while sending Enquiry",
      error,
    });
  }
};

exports.getEnquiry = async (req, res) => {
  try {
    const enquiry = await enquiryModel.find({});
    if (!enquiry) {
      return res.status(200).send({
        success: false,
        message: "No enquiry found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All enquiry list",
      data: enquiry,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting all enquiry",
      error,
    });
  }
};



exports.sendToWhatsapp = async (req, res) => {
 try {
    // Extract data from the request body
    const { name, mobile, email, message } = req.body;

    // Construct the payload
    const payload = {
      to: '+917987206373',
      type: 'template',
      templateName: 'twicks_enquiry_form',
      language: 'en',
      header: null,
      body: {
        parameters: [
          {
            type: 'text',
            text: name, // Use the name from the request body
          },
          {
            type: 'text',
            text: mobile, // Use the mobile from the request body
          },
          {
            type: 'text',
            text: email, // Use the email from the request body
          },
          {
            type: 'text',
            text: message, // Use the message from the request body
          }
        ]
      },
      button: null,
    };

    const apiUrl = 'https://api.telinfy.net/gaca/whatsapp/templates/message';
    const response = await axios.post(apiUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': '47b815c4-9a25-4471-bc6f-87cd1dc31142'
      },
    });

    res.status(200).json({ message: 'API call was successful.', data: response.data });
    console.log(payload);
    console.log(JSON.stringify(payload, null, 2));
 } catch (error) {
    console.error(`API call failed with status code ${error.response?.status}.`);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
 }
};


