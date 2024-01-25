const crypto = require("crypto");
const axios = require("axios");
const uniqid = require("uniqid");
const { setTimeout } = require("timers");

//GET || getting cost alternatives for different courier services
exports.calcShipment = async (req, res) => {
  const { shipping_postcode, weight, declared_value, is_return } = req.body;
  let rs_data = await srShippingRateCalculation(
    shipping_postcode,
    weight,
    declared_value,
    is_return
  );
  //Function ShippingRateCalculation
  function srShippingRateCalculation(
    shipping_postcode,
    weight,
    declared_value,
    is_return
  ) {
    return new Promise(async (resolve, reject) => {
      let resData = {
        status: false,
        mainToken: {},
        message: "Fail!!",
      };
      try {
        let getToken = await srlogin();
        // console.log("below is the api key token recieved");
        // console.log(getToken);

        let paramers = "pickup_postcode=" + process.env.SHOP_PINCODE;
        paramers += "&delivery_postcode=" + shipping_postcode;
        paramers += "&weight=" + weight;
        paramers += "&cod=" + 0;
        paramers += "&declared_value=" + declared_value;
        paramers += "&rate_calculator=1";
        paramers += "&is_return=" + is_return;

        if (getToken.status) {
          console.log(getToken.mainToken);
          var options = {
            method: "get",
            maxBodyLength: Infinity,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken.mainToken}`,
            },
            url:
              "https://apiv2.shiprocket.in/v1/external/courier/serviceability?" +
              paramers,
          };
          axios(options)
            .then(function (response) {
              console.log(
                "Following are the delivery companies available for the delivery service: "
              );
              let minRateObject =
                response.data.data.available_courier_companies.reduce(
                  (prev, curr) => {
                    return prev.rate < curr.rate ? prev : curr;
                  }
                );
              console.log(
                "The minimum rate for delivery is:" +
                  minRateObject.rate +
                  "\n" +
                  "The estimated time of delivery for the service is: " +
                  minRateObject.etd +
                  "\n" +
                  "The name of the service is: " +
                  minRateObject.courier_name
              );
              resData.status = true;
              resData.message = "Success!!";
              resData.mainset = response.data;
              console.log(resData);
              return resData;
            })
            .catch(function (error) {
              console.log("Calculate shipment failure");
              console.log(error);
              resData.status = false;
              resData.message = "Error!!";
              resData.mainset = JSON.stringify(error);
              console.log(resData);
              return resData;
            });
        } else {
          console.log("Token failure");
          resData.status = false;
          resData.message = "Error!! token failure";
          return resData;
        }
      } catch (e) {
        console.error(e);
        resData.status = false;
        resData.message = "Error!!";
        return resData;
      }
    });
  }
};

//POST || creating a new order to be shipped ||SET PICKUP LOCATION IN ACCOUNT IT IS MANDATORY
exports.createOrder = async (req, res) => {
  const {
    pickup_location,
    order_id,
    order_date,
    payment_method,
    channel_id,
    comment,
    reseller_name,
    company_name,
    billing_customer_name,
    billing_last_name,
    billing_address,
    billing_address_2,
    billing_city,
    billing_pincode,
    billing_state,
    billing_country,
    billing_email,
    billing_phone,
    billing_alternate_phone,
    shipping_customer_name,
    shipping_last_name,
    shipping_address,
    shipping_address_2,
    shipping_city,
    shipping_pincode,
    shipping_country,
    shipping_state,
    shipping_email,
    shipping_phone,
    order_items, //array
    sub_total,
    total_discount,
    length,
    breadth,
    height,
    weight,
  } = req.body;

  let newShipData = await newShipFunction();

  async function newShipFunction() {
    let getToken = await srlogin();
    console.log("below is the api key token recieved");
    console.log(getToken);

    if (getToken.status) {
      await axios
        .post(
          "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
          {
            order_id: order_id,
            order_date: order_date,
            payment_method: payment_method,
            pickup_location: pickup_location,
            billing_customer_name: billing_customer_name,
            billing_last_name: billing_last_name,
            billing_address: billing_address,
            billing_address_2: billing_address_2,
            billing_city: billing_city,
            billing_pincode: billing_pincode,
            billing_state: billing_state,
            billing_country: billing_country,
            billing_email: billing_email,
            billing_phone: billing_phone,
            billing_alternate_phone: billing_alternate_phone,
            shipping_is_billing: 1,
            shipping_customer_name: shipping_customer_name,
            shipping_last_name: shipping_last_name,
            shipping_address: shipping_address,
            shipping_address_2: shipping_address_2,
            shipping_city: shipping_city,
            shipping_pincode: shipping_pincode,
            shipping_country: shipping_country,
            shipping_state: shipping_state,
            shipping_email: shipping_email,
            shipping_phone: shipping_phone,
            order_items: order_items,
            payment_method: payment_method,
            sub_total: sub_total,
            total_discount: total_discount,
            length: length,
            breadth: breadth,
            height: height,
            weight: weight,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken.mainToken}`,
            },
          }
        )
        .then(function (response) {
          console.log(response);
          console.log(response.order_id);
          console.log(response.shipment_id);
          res.status(200).send({
            success: true,
            message: "Order created successfully",
          });
        })
        .catch(function (error) {
          console.log("error in creating order error message as follows: ");
          console.log(error);
          return res.status(error.response.data.status_code).send({
            success: false,
            message: error.response.data.message,
          });
        });
    } else {
      console.log("token recieval from the srlogin function failed");
      return res.status(400).send({
        success: false,
        message: "Token recieval from the srlogin function failed",
      });
    }
  }
};

//GET || getting details of an order using order_id
exports.getOrderDetsFunction = async (req, res) => {
  let { order_id } = req.body;

  let getToken = await srlogin();
  console.log("below is the api key token recieved");
  console.log(getToken);

  if (getToken) {
    let options = {
      method: "get",
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken.mainToken}`,
      },
      url: "https://apiv2.shiprocket.in/v1/external/orders/show/" + order_id,
    };

    await axios(options)
      .then(function (response) {
        if (response == {}) {
          res.send({
            success: failure,
            message: "No order found",
          });
        }
        let orderDets = response.data.data;
        console.log(orderDets);
        res.status(200).send({
          success: true,
          message: "Order details are as follows: ",
          orderDets,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

//POST || generating AWB for order mandatory for shipment pickup
exports.generateAWBFunction = async (req, res) => {
  let { shipment_id } = req.body;

  let getToken = await srlogin();
  console.log("below is the api key token recieved");
  console.log(getToken);

  let paramers = "shipment_id=" + shipment_id;
  if (getToken.status) {
    let options = {
      method: "post",
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken.mainToken}`,
      },
      url:
        "https://apiv2.shiprocket.in/v1/external/courier/assign/awb?" +
        paramers,
    };
    await axios(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        if (
          error.response.data.status_code == 500 ||
          error.response.data.status_code == 502 ||
          error.response.data.status_code == 503 ||
          error.response.data.status_code == 504
        ) {
          res.status(500).send({
            message: "Server error at shiprocket missing data",
            status_code: error.response.data.status_code,
            error,
          });
        } else if (error.response.data.status_code == 401) {
          res.status(401).send({
            message: "Eroor in authenticating request error",
            status_code: error.response.data.status_code,
          });
        } else if (error.response.data.status_code == 404) {
          res.status(404).send({
            message: "Invaliv url access requested, check params",
            status_code: error.response.data.status_code,
          });
        } else if (error.response.data.status_code == 422) {
          res.status(422).send({
            message: "Unable to process params, check params",
            status_code: error.response.data.status_code,
          });
        } else if (error.response.data.status_code == 429) {
          res.status(429).send({
            message: "Rate limit exceeded",
            status_code: error.response.data.status_code,
          });
        } else {
          res.status(500).send({
            success: false,
            status_code: error.response.data.status_code,
            error,
          });
        }
      });
  } else {
    console.log("token recieval failed from the srlogin function");
  }
};

//POST || response is download url for invoice orders passed as array of ORDER_ids
exports.generateInvoiceFunction = async (req, res) => {
  // https://apiv2.shiprocket.in/v1/external/orders/print/invoice

  let { order_ids } = req.body;

  let getToken = await srlogin();
  console.log("below is the api key token recieved: ");
  console.log(getToken);

  if (getToken) {
    // let options = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${getToken.mainToken}`,
    //   },
    //   url:
    //     "https://apiv2.shiprocket.in/v1/external/orders/print/invoice?" +
    //     paramers,
    // };

    await axios
      .post(
        "https://apiv2.shiprocket.in/v1/external/orders/print/invoice",
        {
          ids: order_ids,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken.mainToken}`,
          },
        }
      )
      .then(function (response) {
        let invoice_url = response.data.invoice_url;
        res.status(200).send({
          success: true,
          message: "Order invoice generated check here: ",
          invoice_url,
        });
      })
      .catch(function (error) {
        console.log(error);
        res.status(error.response.data.status).send({
          success: false,
          message: error.response.data.message,
        });
      });
  }
};

//POST || requesting pickup of a shipment
exports.setPickupFunction = async (req, res) => {
  let { shipment_id, pickup_date } = req.body;
  // let paramers = "shipment_id=" + shipment_id + "&pickup_date=" + pickup_date;

  let getToken = await srlogin();
  console.log("below is the api key token recieved: ");
  console.log(getToken);

  if (getToken) {
    // let options = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${getToken.mainToken}`,
    //   },
    //   url:
    //     "https://apiv2.shiprocket.in/v1/external/courier/generate/pickup?" +
    //     paramers,
    // };

    await axios
      .post(
        "https://apiv2.shiprocket.in/v1/external/courier/generate/pickup",
        {
          shipment_id: shipment_id,
          pickup_date: pickup_date,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken.mainToken}`,
          },
        }
      )
      .then(function (response) {
        let Booked_date = response.data.Booked_date;
        if (response.data.Status == true) {
          res.status(200).send({
            success: true,
            message:
              "Shipment pickup successfully set, following is the date: ",
            Booked_date,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        res.status(error.response.data.status).send({
          success: false,
          message: "error.response.data.message",
        });
      });
  }
};

//POST || generating manifest for shipment
exports.generateManifestFunction = async (req, res) => {
  let { shipment_id } = req.body;
  let getToken = await srlogin();
  console.log("below is the api key token recieved");
  console.log(getToken);

  if (getToken) {
    await axios
      .post(
        "https://apiv2.shiprocket.in/v1/external/manifests/generate",
        {
          shipment_id: shipment_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken.mainToken}`,
          },
        }
      )
      .then(function (response) {
        let manifest_url = response.data.manifest_url;
        if (manifest_url === "") {
          return res.send({
            success: false,
            message: "Missing fields or invalid data",
          });
        }
        return res.status(200).send({
          success: true,
          message: "Manifest generated check here: ",
          manifest_url,
        });
      })
      .catch(function (error) {
        if (error.response.data.status_code === 400) {
          return res.status(400).send({
            success: false,
            message: "Manifest for the shipment already generated",
          });
        }
      });
  }
};

//GET || getting shipment details by shipment id
exports.shipmentDetsFunction = async (req, res) => {
  let { shipment_id } = req.body;
  let getToken = await srlogin();
  console.log("below is the api key token recieved");
  console.log(getToken);

  if (getToken) {
    let options = {
      method: "get",
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken.mainToken}`,
      },
      url: "https://apiv2.shiprocket.in/v1/external/shipments/" + shipment_id,
    };

    await axios(options)
      .then(function (response) {
        if (response == {}) {
          return res.send({
            success: failure,
            message: "No shipment found",
          });
        }
        let shipDets = response.data;
        return res.status(200).send({
          success: true,
          message: "Shipment details as follows: ",
          shipDets,
        });
      })
      .catch(function (error) {
        console.log(error);
        return res.status(error.response.data.status).send({
          success: false,
          message: error.response.data.message,
        });
      });
  }
};

//POST || cancelling shipment by shipment id
exports.cancelShipmentFunction = async (req, res) => {
  let { awbs } = req.body; //array of awbs
  if (awbs == []) {
    return res.status(404).send({
      success: false,
      message: "No AWBs were sent",
    });
  }
  let getToken = await srlogin();
  console.log("below is the api key token recieved");
  console.log(getToken);

  if (getToken) {
    await axios
      .post(
        "https://apiv2.shiprocket.in/v1/external/orders/cancel/shipment/awbs",
        { awbs: awbs },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken.mainToken}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        return res.status(200).send({
          success: true,
          message: response.data.message,
        });
      })
      .catch(function (error) {
        console.log(error);
        return res.status(error.response.data.status).send({
          success: false,
          message: error.response.data.message,
        });
      });
  }
};

//POST || creating a return order
exports.createReturnOrderFunction = async (req, res) => {
  // const{ channel_id } =await axios.get("/ship/orderDets",{"order_id":order_id});

  const {
    // pickup_location,
    order_id,
    order_date,
    payment_method,
    channel_id,
    pickup_customer_name,
    pickup_last_name,
    pickup_address,
    pickup_address_2,
    pickup_city,
    pickup_pincode,
    pickup_state,
    pickup_country,
    pickup_email,
    pickup_phone,
    // pickup_alternate_phone,
    shipping_customer_name,
    shipping_last_name,
    shipping_address,
    shipping_address_2,
    shipping_city,
    shipping_pincode,
    shipping_country,
    shipping_state,
    shipping_email,
    shipping_phone,
    order_items, //array
    sub_total,
    total_discount,
    length,
    breadth,
    height,
    weight,
  } = req.body;

  let getToken = await srlogin();
  console.log("below is the api key token recieved");
  console.log(getToken);

  if (getToken) {
    await axios
      .post(
        "https://apiv2.shiprocket.in/v1/external/orders/create/return",
        {
          order_id: order_id,
          order_date: order_date,
          channel_id: channel_id,
          pickup_customer_name: pickup_customer_name,
          pickup_last_name: pickup_last_name,
          pickup_address: pickup_address,
          pickup_address_2: pickup_address_2,
          pickup_city: pickup_city,
          pickup_state: pickup_state,
          pickup_country: pickup_country,
          pickup_pincode: pickup_pincode,
          pickup_email: pickup_email,
          pickup_phone: pickup_phone,
          shipping_customer_name: shipping_customer_name,
          shipping_last_name: shipping_last_name,
          shipping_address: shipping_address,
          shipping_address_2: shipping_address_2,
          shipping_city: shipping_city,
          shipping_country: shipping_country,
          shipping_pincode: shipping_pincode,
          shipping_state: shipping_state,
          shipping_email: shipping_email,
          shipping_phone: shipping_phone,
          order_items: order_items,
          payment_method: payment_method,
          total_discount: total_discount,
          sub_total: sub_total,
          length: length,
          breadth: breadth,
          height: height,
          weight: weight,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken.mainToken}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        if (response.status_code == 422) {
          return res.status(422).send({
            success: false,
            message: response.data.message,
          });
        }
        return res.status(200).send({
          success: true,
          message: response.data.status,
        });
      })
      .catch(function (error) {
        if (error.data.status_code == 400) {
          return res.status(400).send({
            success: false,
            message: error.response.data.message,
          });
        } else {
          console.log(error);
          return res.status(error.response.data.status_code).send({
            success: false,
            message: error.response.data.message,
          });
        }
      });
  }
};

//POST || generating AWB for return order mandatory for shipment pickup
exports.generateRetAWBFunction = async (req, res) => {
  let getToken = await srlogin();
  console.log("below is the api key token recieved");
  console.log(getToken);
  let { shipment_id, courier_id, status } = req.body;

  let paramers = "shipment_id=" + shipment_id;
  if (courier_id != null) {
    paramers += "&courier_id=" + courier_id;
  }
  if (status != "") {
    paramers += "&status=" + status;
  }
  paramers += "&is_return=" + 1;
  if (getToken.status) {
    let options = {
      method: "post",
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken.mainToken}`,
      },
      url:
        "https://apiv2.shiprocket.in/v1/external/courier/assign/awb?" +
        paramers,
    };
    await axios(options)
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        if (
          error.response.data.status_code == 500 ||
          error.response.data.status_code == 502 ||
          error.response.data.status_code == 503 ||
          error.response.data.status_code == 504
        ) {
          return res.status(500).send({
            message: "Server error at shiprocket missing data",
            status_code: error.response.data.status_code,
          });
        } else if (error.response.data.status_code == 401) {
          return res.status(401).send({
            message: "Eroor in authenticating request error",
            status_code: error.response.data.status_code,
          });
        } else if (error.response.data.status_code == 404) {
          return res.status(404).send({
            message: "Invaliv url access requested, check params",
            status_code: error.response.data.status_code,
          });
        } else if (error.response.data.status_code == 422) {
          return res.status(422).send({
            message: "Unable to process params, check params",
            status_code: error.response.data.status_code,
          });
        } else if (error.response.data.status_code == 429) {
          return res.status(429).send({
            message: "Rate limit exceeded",
            status_code: error.response.data.status_code,
          });
        } else {
          return res.status(500).send({
            success: false,
            status_code: error.response.data.status_code,
            error,
          });
        }
      });
  } else {
    console.log("token recieval failed from the srlogin function");
  }
};
//getToken Function ||Authentication via login and token recieval REQUIRED FOR ALL API CALLS
function srlogin() {
  return new Promise(async (resolve, reject) => {
    //DUMMY RESPONSE DATA, UPDATED ON RESPONSE RECIEVAL
    let resData = {
      status: false,
      mainToken: {},
      message: "Fail!!",
    };
    //REQUIRED DATA FOR AUTHENTICATION API
    var srlogindata = JSON.stringify({
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    });
    try {
      //REQUIRED OPTIONS FOR AUTHENTICATION API
      var options = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://apiv2.shiprocket.in/v1/external/auth/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: srlogindata,
      };

      //CALLING LOGIN FOR GETTING TOKEN POST AUTHENTICATION
      axios(options)
        .then(function (response) {
          resData.status = true;
          resData.message = "Success!!";
          resData.mainToken = response.data.token;
          resolve(resData);
        })
        .catch(function (error) {
          console.error(error);
          reject(resData);
        });
    } catch (e) {
      console.error(e);
      res.send({
        success: false,
        message: e.response.message,
        status: e.response.data.status_code,
      });
    }
  });
}
