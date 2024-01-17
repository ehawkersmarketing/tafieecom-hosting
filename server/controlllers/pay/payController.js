const crypto = require("crypto");
const axios = require("axios");
const uniqid = require("uniqid");

const giveUniqueId = (length) => {
  return "TAFI" + uniqid(length);
};

//PhonePe redirect for payment
exports.payFunction = async (req, res) => {
  try {
    const merchantTransactionId = giveUniqueId(16); // use uniqid package for generating this
    const { amount } = req.body;
    const data = {
      //Required data structure for the pay API call
      merchantId: process.env.MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: process.env.MERCHANT_USER_ID,
      amount: amount,
      redirectUrl: `http://localhost:8080/api/pay/checkStatus/${merchantTransactionId}`, //url to be redirected post complete transaction
      redirectMode: "REDIRECT",
      callbackUrl: "https://localhost:8080/api/pay/getOrderLog", //url to post complete transaction response by API
      mobileNumber: process.env.MOBILE_NUMBER,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    const string =
      payloadMain + "/pg/v1/pay" + process.env.PHONEPE_API_SALT_KEY;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + process.env.KEY_INDEX; // required value for sendin in the X_VERIFY field in header
    // const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";

    const options = {
      //required options structure for the API call
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
        // console.log(response.data.data.instrumentResponse.redirectInfo.url);//url to PhonePe page for payment
        res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
      })
      .catch(function (error) {
        // console.error(error);
        res.status(500).send({
          message: "Error in connecting to PhonePe Try sometime later",
          success: false,
        });
      });
  } catch (error) {
    res
      .status(500)
      .send({
        message: error.message,
        success: false,
      })
      .then();
  }
};

exports.checkStatusFunction = async (req, res) => {
  const { transactionId } = req.params; //sent as params withthe redirect from the pay API
  const string =
    `/pg/v1/status/${process.env.MERCHANT_ID}/${transactionId}` +
    process.env.PHONEPE_API_SALT_KEY;
  const sha256 = crypto.createHash("sha256").update(string).digest("hex");
  const checksum = sha256 + "###" + process.env.KEY_INDEX; // required value for sendin in the X_VERIFY field in header

  //FOLLOWING IS THE HEADER STRUCTURE AND OPTIONS MANDATORY FOR GET STATUS REQUEST
  const options = {
    method: "get",
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${process.env.MERCHANT_ID}/${transactionId}`,
    headers: {
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": `${process.env.MERCHANT_ID}`,
    },
  };
  try {
    axios
      .request(options)
      .then(function (response) {
        // console.log(response); //STATUS OF THE PAYMENT TRANSACTION IS LOGGED
        if (response.data.success === true) {
          //CREATING A PAYMENT MODEL DOCUMENT AFTER SUCCESSFULL TRANSACTION IS COMPLETE
          //   const newPayment = new paymentModel({
          //     // in this model keep the payment success by default pending and update only after the check status give success response
          //     transactionId: response.data.data.MerchantransactionId,
          //     merchantId: response.data.data.merchantId,
          //     amount: response.data.data.amount,
          //     transactionStatus: response.data.data.transactionStatus,
          //   });
          //   newPayment.save();
          console.log(
            "making the new object in paymentModel after successfull status "
          );
        }
        res.redirect("http://localhost:8080/api/cart");
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          // console.log(error);
          res.status(401).send({
            success: false,
            message:
              "Authentication failed, authorization failed invalid value in header",
          });
        } else if (error.response.status == 400) {
          // console.log(error);
          res.status(400).send({
            success: false,
            message: "Status check failed, invalid API url",
          });
        } else if (error.response.status == 500) {
          // console.log(error);
          res.status(500).send({
            success: false,
            message: "Payment Failed",
          });
        } else {
          // console.log(error);
          res.status(500).send({
            success: false,
            message: "Payment Failed",
          });
          res.redirect("http://localhost:8080/api/cart"); //redirect to cart upon status success of the transaction is confirmed
        }
      });
  } catch (err) {
    console.log(err);
  }
};

exports.getOrderLogFunction = async (req, res) => {
  try {
    console.log(req); //logging the post req. recieved at the callBack url upon transaction completion
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message:
        "ERROR IN GETTING POST REQUEST FROM THE PHONEPE API CONFIRMING PAYMENT INITIATION",
      success: false,
    });
  }
};

exports.refundFunction = async (req, res) => {
  try {
    const { transactionId } = req.body;
    const refundTransId = giveUniqueId(16);
    const refundAmount = await paymentModel.findOne({
      transactionId: transactionId,
    }).amount; //amount that has to be refunded from the paymentModel referring to successfull transactions
    const data = {
      merchantId: process.env.MERCHANT_ID,
      merchantUserId: process.env.MERCHANT_USER_ID,
      originalTransactionId: transactionId,
      merchantTransactionId: refundTransId,
      amount: refundAmount, //change this to the value from the payments model
      callbackUrl: "https://localhost:8080/api/pay/getOrderLog",
    };
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    const string =
      payloadMain + "/pg/v1/pay" + process.env.PHONEPE_API_SALT_KEY;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + process.env.KEY_INDEX;

    // HEADER STRUCTURE AND OPTIONS MANDATORY FOR REFUND PAYMENT
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
      .then(async function (response) {
        console.log(response); //RESPONSE FROM THE REFUND PROCESS API
        try {
          const refundCommited = await paymentModel.findOneAndUpdate(
            { transactionId: transactionId },
            {
              refund: true,
              refundCommited,
            }
          );
          res.status(200).send({
            success: true,
            message: "REFUND SUCCESSFULllY UPDATED IN PAYMENT MODEL",
          });
        } catch (err) {
          console.log(err);
          res.status(500).send({
            success: false,
            message: "ERROR IN FINDING AND UPDATING PAYMENT TRANSACTION",
          });
        }
      })
      .catch(function (error) {
        if (error.response.status === 500) {
          // console.log(error.response.status);
          res.status(500).send({
            success: false,
            message: "ERROR IN REFUNDING THE PAYMENT",
          });
        }
      });
  } catch (err) {
    // console.log(err);
    res.status(500).send({
      success: false,
      message: "ERROR IN REFUNDING THE PAYMENT",
    });
  }
};
