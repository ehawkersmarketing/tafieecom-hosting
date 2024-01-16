const crypto = require("crypto");
const axios = require("axios");
const salt_key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399"; //has to be kept in .env
// const merchant_id = "PGTESTPAYUAT"; //has to be kept in .env
const uniqid = require("uniqid");

exports.payFunction = async (req, res) => {
  try {
    const merchantTransactionId = req.body.transactionId; // use uniqid package for generating this
    const data = {
      merchantId: process.env.MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: "MUID123",
      amount: 10,
      redirectUrl: "https://webhook.site/localhost:8080/api/cart",
      redirectMode: "REDIRECT",
      callbackUrl: "https://webhook.site/callback-url",
      mobileNumber: "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    const keyIndex = 1;
    const string = payloadMain + "/pg/v1/pay" + salt_key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    // const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";

    const options = {
      method: "post",
      url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payloadMain,
      },
    };
    await axios
      .request(options)
      .then(function (response) {
        res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

exports.checkStatusFunction = async (req, res) => {
  const merchantTransactionId = req.body.transactionId;
  //   const merchantId = req.body.merchantId;

  const options = {
    method: "get",
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/PGTESTPAYUAT/${merchantTransactionId}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (err) {
    console.log(err);
  }
};
// const checkStatus = async (req, res) => {
//   const merchantTransactionId = res.req.body.transactionId;
//   const merchantId = res.req.body.merchantId;

//   const keyIndex = 1;
//   const string =
//     `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
//   const sha256 = crypto.createHash("sha256").update(string).digest("hex");
//   const checksum = sha256 + "###" + keyIndex;

//   const options = {
//     method: "GET",
//     url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
//     headers: {
//       accept: "application/json",
//       "Content-Type": "application/json",
//       "X-VERIFY": checksum,
//       "X-MERCHANT-ID": `${merchantId}`,
//     },
//   };

//   // CHECK PAYMENT TATUS
//   axios
//     .request(options)
//     .then(async (response) => {
//       if (response.data.success === true) {
//         const url = `http://localhost:3000/success`;
//         return res.redirect(url);
//       } else {
//         const url = `http://localhost:3000/failure`;
//         return res.redirect(url);
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// module.exports = {
//   newPayment,
//   checkStatus,
// };
