const crypto = require("crypto");
const axios = require("axios");
const uniqid = require("uniqid");
const { setTimeout } = require("timers");
const transactionModel = require("../../models/transactionModel/transactionModel");

const giveUniqueId = (length) => {
  return "TAFI" + uniqid(length);
};

//redirecting to PhonePe for payment facilitation
exports.payFunction = async (req, res) => {
  try {
    const merchantTransactionId = giveUniqueId(16); // use uniqid package for generating this
    const { amount, cartId } = req.body;
    const data = {
      //Required data structure for the pay API call
      merchantId: process.env.MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: process.env.MERCHANT_USER_ID,
      amount: amount,
      redirectUrl: `http://localhost:8080/api/pay/checkStatus/${merchantTransactionId}/${cartId}`, //url to be redirected post complete transaction
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
        console.log(response.data.data.instrumentResponse.redirectInfo.url); //url to PhonePe page for payment
        res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
      })
      .catch(function (error) {
        console.error(error);

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

//Check status call => accepting success and making document in trasaction DB
exports.checkStatusFunction = async (req, res) => {
  const { transactionId, cartId } = req.params; //sent as params withthe redirect from the pay API
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
  let n = 10;
  let status = statusCall(n, options, cartId);
  console.log(`This is the status ${status}`);
  if (status) {
    return res.redirect("http://localhost:8080/api/cart"); //LANDING PAGE TO REDIRECT TO AFTER ORDER CONFIRMATION
  } else {
    return res.status(500).semd({
      success: false,
      message: "Check status returned failed status of transaction",
    });
  }
};

//recursive status check function called when first status call fails
async function statusCall(n, options, cartId) {
  try {
    let response = await axios.request(options);
    if (response.data.success === true) {
      console.log(response.data.data);
      console.log("Taking data to place order");

      const newTransaction = new transactionModel({
        transactionId: response.data.data.transactionId,
        status: "COMPLETE",
        date: Date.now(),
        amount: response.data.data.amount,
        // cartId:cartId,
      });
      try {
        await newTransaction.save().then(() => {
          console.log(
            "transaction successfully and document made in transactionModel" +
              newTransaction._id
          );
          return true;
        });
      } catch (error) {
        console.log(error);
        console.log("failure in saving new transaction");
        return false;
      }
    } else {
      if (n === 0) {
        return false;
      } else {
        return setTimeout(statusCall(--n, options, cartId), 3000);
      }
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

exports.getOrderLogFunction = async (req, res) => {
  try {
    console.log(req); //logging the post req. recieved at the callBack url upon transaction completion
  } catch (err) {
    console.log(err);
    return res.status(500).send({
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
    const refundEntry = await transactionModel.findOne({
      transactionId: transactionId,
      status: "COMPLETE",
    }); //amount that has to be refunded from the paymentModel referring to successfull transactions
    console.log(refundEntry);
    const refundAmount = refundEntry.amount;
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
              status: "REFUNDED",
              refundTransactionId: response.data.data.transactionId,
            }
          );
          console.log("refund commited in transactinoModel");
          return res.status(200).send({
            success: true,
            message: "REFUND SUCCESSFULllY UPDATED IN PAYMENT MODEL",
          });
        } catch (err) {
          console.log(err);
          return res.status(500).send({
            success: false,
            message: "ERROR IN FINDING AND UPDATING PAYMENT TRANSACTION",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 500) {
          // console.log(error.response.status);
          return res.status(500).send({
            success: false,
            message: "ERROR IN REFUNDING THE PAYMENT",
          });
        }
      });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "ERROR IN REFUNDING THE PAYMENT",
    });
  }
};
