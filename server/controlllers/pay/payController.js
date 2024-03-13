const crypto = require("crypto");
const axios = require("axios");
const uniqid = require("uniqid");
const { setTimeout } = require("timers");
const transactionModel = require("../../models/transactionModel/transactionModel");
const orderModel = require("../../models/orderModel/orderModel");
const { Console } = require("console");
const { json } = require("express");

const giveUniqueId = (length) => {
  return "TAFI" + uniqid(length);
};
// const merchantTransactionId = giveUniqueId(16);

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
      amount: amount * 100,
      redirectUrl: `http://localhost:8080/api/pay/checkStatus?transactionId=${merchantTransactionId}&cartId=${cartId}`, //url to be redirected post complete transaction
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
    const SHA256 = crypto.createHash("SHA256").update(string).digest("hex");
    const checksum = SHA256 + "###" + process.env.KEY_INDEX; // required value for sendin in the X_VERIFY field in header
    console.log(checksum);
    console.log(payloadMain);


    const options = {
      //required options structure for the API call
      method: "post",
      url: "https://api.phonepe.com/apis/hermes/pg/v1/pay",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payloadMain,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log("get the pay response ",response.data.data);
        res.json({
          success: true,
          data: response.data.data.instrumentResponse.redirectInfo.url,
        });
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

exports.checkStatusFunction = async (req, res) => {
  const { transactionId, cartId, isRefund } = req.query;
  if (isRefund) {
    const string =
      `/pg/v1/status/${process.env.MERCHANT_ID}/${transactionId}` +
      process.env.PHONEPE_API_SALT_KEY;
    const SHA256 = crypto.createHash("SHA256").update(string).digest("hex");
    const checksum = SHA256 + "###" + process.env.KEY_INDEX;
    const options = {
      method: "get",
      url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${process.env.MERCHANT_ID}/${transactionId}`,
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": `${process.env.MERCHANT_ID}`,
      },
    };
    let n = 1;
    let status = await statusCall(n, options, cartId , transactionId);
    if (status) {
      const order = await orderModel.findOneAndUpdate(
        {
          _id: cartId,
        },
        {
          transactionStatus: "REFUNDED",
        }
      );
      if (order) {
        res.json({
          success: true,
          message: "Transaction Refunded Successfully",
        });
      } else {
        res.json({
          success: false,
          message: "Transaction Refunded due to order not found Failed",
        });
      }
    } else {
      res.json({
        success: false,
        message: "Transaction Refunded Failed",
      });
    }
    // if (status) {
    //   return res.redirect("http://localhost:8080/");
    // } else {
    //   return res.status(500).send({
    //     success: false,
    //     message: "Check status returned failed status of transaction",
    //   });
    // }
  } else {
    const string =
      `/pg/v1/status/${process.env.MERCHANT_ID}/${transactionId}` +
      process.env.PHONEPE_API_SALT_KEY;
    const SHA256 = crypto.createHash("SHA256").update(string).digest("hex");
    const checksum = SHA256 + "###" + process.env.KEY_INDEX;
    const options = {
      method: "get",
      url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${process.env.MERCHANT_ID}/${transactionId}`,
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": `${process.env.MERCHANT_ID}`,
      },
    };
    let n = 1;
    let status = await statusCall(n, options, cartId , transactionId);
    if (status.success) {
      // Append the success status as a query parameter to the redirect URL
      // and include a source parameter to indicate the transaction source
      console.log("satus before confirmation",status)
      // return res.redirect(
      //   //  `http://twicks.in/OrderConfirmationPage/${status.orderId}`
      //    `twicks://OrderConfirmation?${status.orderId}`
      // );
      const deepLinkUrl = `twicks://OrderConfirmation?orderId=${status.orderId}`;
 // Redirect to the app
    return res.redirect(deepLinkUrl)
     } else {
      res.success = false;
      return res.redirect(
        `twicks://OrderConfirmation?${status.orderId}`
      );
     }}
    }

async function statusCall(n, options, cartId , transactionId) {
  try {
    if (cartId == null) {
      let response = await axios.request(options);
      if (response.data.success === true) {
        return true;
      } else {
        if (n === 0) {
          return false;
        } else {
          // Correctly use setTimeout with a callback function
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(statusCall(--n, options, null));
            }, 3000);
          });
        }
      }
    } else {
      let response = await axios.request(options);
      if (response.data.success === true) {
        try {
          const { data } = await axios.post(
            "http://localhost:8080/api/placeOrder",
            {
              cartId: cartId,
              transactionId: response.data.data.transactionId,
              amount: response.data.data.amount,
              transactionStatus: response.data.data.state,
            }
          );
          const responseData = await transactionModel({ 
            orderId:data.data._id,  
            transactionId:data.data.transactionId,
            merchantTransactionId:transactionId,
            shipment_charge:data.data.shipment_charge,
            merchantUserId:process.env.MERCHANT_ID,
            amount: data.data.amount,
            status: "payment Successfull",
            cartId: cartId
          });
          responseData.save();

          if (data.success) {
            const { data: request } = await axios.post(
              "http://localhost:8080/api/ship/requestApproval",
              {
                orderId: data.data._id,
              }
            );
            if (request.success) {
              console.log("fetch request approve",data.data._id)
              return {
                success: true,
                orderId: data.data._id,
              };
            } else {
              return { success: false };
            }
          }

        } catch (error) {
          console.log(error);
          console.log("failure in saving new transaction");
          return { success: false };
        }
      } else {
        if (n === 0) {
          return { success: false };
        } else {
          // Correctly use setTimeout with a callback function
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(statusCall(--n, options, cartId));
            }, 3000);
          });
        }
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
    const { transactionId, orderId } = req.body;
    const refundTransId = giveUniqueId(16);
    const refundEntry = await orderModel.findOne({
      _id: orderId,
    }); //amount that has to be refunded from the paymentModel referring to successfull transactions
       const transactionDetails = await transactionModel.findOne({orderId:orderId})
    const refundAmount = (refundEntry.amount + refundEntry.shipment_charge);
    const data = {
      merchantId: process.env.MERCHANT_ID,
      merchantUserId: process.env.MERCHANT_USER_ID,
      originalTransactionId: transactionDetails.merchantTransactionId,
      merchantTransactionId: refundTransId,
      amount: refundAmount, //change this to the value from the payments model
      callbackUrl: "http://localhost:8080/api/pay/getOrderLog",
    };
    const payload = JSON.stringify(data);

    const payloadMain = Buffer.from(payload).toString("base64");
    console.log("payloadMain", payloadMain);
    const string =
      payloadMain + "/pg/v1/refund" + process.env.PHONEPE_API_SALT_KEY;
    const SHA256 = crypto.createHash("SHA256").update(string).digest("hex");
    const checksum = SHA256 + "###" + process.env.KEY_INDEX;
    console.log("checksum", checksum);
    // SHA256(base64 encoded payload + “/pg/v1/refund” + salt key) + ### + salt index

    // HEADER STRUCTURE AND OPTIONS MANDATORY FOR REFUND PAYMENT
    const options = {
      method: "post",
      url: "https://api.phonepe.com/apis/hermes/pg/v1/refund",
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
        try {
          const { data } = await axios.get(
            `http://localhost:8080/api/pay/checkStatus?transactionId=${response?.data.data.transactionId}&cartId=${orderId}&isRefund=1`
          );
          if (data.success) {
            console.log("payment refunded")
          return  res.status(200).send({
              success: true,
              message: "PAYMENT Refunded",
            });
          } else {
            console.log("failed payment")
            res.status(500).send({
              success: false,
              message: "Failed to refund your payment.",
            });
          }
        } catch (err) {
          console.log("caught error")
          console.log(err);
          res.status(500).send({
            success: false,
            message: "ERROR IN FINDING AND UPDATING PAYMENT TRANSACTION",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 500) {
          console.log(error)
          res.status(500).send({
            success: false,
            message: "ERROR IN REFUNDING THE PAYMENT status 500",
          });
        }
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "ERROR IN REFUNDING THE PAYMENT",
    });
  }
};
