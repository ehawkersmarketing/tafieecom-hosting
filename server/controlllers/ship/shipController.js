const crypto = require("crypto");
const axios = require("axios");
const uniqid = require("uniqid");
const { setTimeout } = require("timers");

//GET || getting cost alternatives for different courier services
exports.calcShipment = async (req, res) => {
  const { pickup_postcode, shipping_postcode, weight, shipping_value } =
    req.body;
  res.status(200).send({
    success: true,
    message: "calculate shipment controller triggered",
  });

  let rs_data = await srShippingRateCalculation(
    pickup_postcode,
    shipping_postcode,
    weight,
    // "xyzORDER_ID",
    shipping_value
  );
  //Function ShippingRateCalculation
  function srShippingRateCalculation(
    pickup_postcode,
    shipping_postcode,
    weight,
    // order_id,
    declared_value
  ) {
    return new Promise(async (resolve, reject) => {
      let resData = {
        status: false,
        mainToken: {},
        message: "Fail!!",
      };
      try {
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        let getToken = await srlogin();
        console.log("below is the api key token recieved");
        // console.log(getToken);
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        let paramers = "pickup_postcode=" + pickup_postcode;
        paramers += "&delivery_postcode=" + shipping_postcode;
        paramers += "&weight=" + weight;
        // paramers += "&order_id=" + order_id;
        paramers += "&cod=0";
        paramers += "&declared_value=" + declared_value;
        paramers += "&rate_calculator=1";
        paramers += "&is_return=0";
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
              console.log(response.data.data.available_courier_companies);
              resData.status = true;
              resData.message = "Success!!";
              resData.mainset = response.data;
              console.log(resData);
            })
            .catch(function (error) {
              console.log("Calculate shipment failure");
              resData.status = false;
              resData.message = "Error!!";
              resData.mainset = JSON.stringify(error);
              console.log(resData);
            });
        } else {
          console.log("token failure");
          resData.status = false;
          resData.message = "Error!!";
          // reject(resData);
        }
      } catch (e) {
        console.error(e);
        console.log("sdvkbnhujdfbk");
        // reject(resData);
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

    let paramers = "order_id=" + order_id;
    paramers += "&order_date=" + order_date; //mandatory
    paramers += "&pickup_location=" + pickup_location; //mandatory
    // paramers += "&comment=" + comment;
    paramers += "&billing_customer_name=" + billing_customer_name; //billing customer name
    paramers += "&billing_last_name=" + billing_last_name; //billing customer last name
    paramers += "&billing_address=" + billing_address; //billing address 1
    if (billing_address_2 != "") {
      paramers += "&billing_address_2=" + billing_address_2; //billing address 2
    }
    paramers += "&billing_city=" + billing_city; //billing city mand.
    paramers += "&billing_pincode=" + billing_pincode; //billing pincode mand.
    paramers += "&billing_state=" + billing_state; //billing state mand.
    paramers += "&billing_country=" + billing_country; //billing country mand.
    paramers += "&billing_email=" + billing_email; //billing email mand.
    paramers += "&billing_phone=" + billing_phone; //billing phone mand.
    if (billing_alternate_phone != "") {
      paramers += "&billing_alternate_phone=" + billing_alternate_phone; //billing alternate phone mand.
    }
    paramers += "&shipping_is_billing=" + 1;
    paramers += "&shipping_customer_name=" + shipping_customer_name;
    paramers += "&shipping_last_name=" + shipping_last_name;
    paramers += "&shipping_address=" + shipping_address; //billing shipping address mand. if shipping not billing
    if (shipping_address_2 != "") {
      paramers += "&shipping_address_2=" + shipping_address_2; //billing shipping address 2 mand. if shipping not billing
    }
    paramers += "&shipping_city=" + shipping_city; //billing shipping city mand. if shipping not billing
    paramers += "&shipping_pincode=" + shipping_pincode; //billing shipping pincode mand. if shipping not billing
    paramers += "&shipping_country=" + shipping_country; //billing shipping country mand. if shipping not billing
    paramers += "&shipping_state=" + shipping_state; //billing shipping state mand. if shipping not billing
    paramers += "&shipping_email=" + shipping_email; //(ASK)    billing shipping email  if shipping not billing
    paramers += "&shipping_phone=" + shipping_phone; //(ASK)    billing shipping phone mand. if shipping not billing
    paramers += "&order_items=" + order_items; //order items mand.
    paramers += "&payment_method=" + "Prepaid";
    paramers += "&sub_total=" + sub_total;
    paramers += "&total_discount=" + total_discount;
    paramers += "&length=" + length; //order items mand.
    paramers += "&breadth=" + breadth; //order items mand.
    paramers += "&height=" + height; //order items mand.
    paramers += "&weight=" + weight;

    // console.log("following is the url we are pinging for createOrder:");
    // console.log(
    //   "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc?" + paramers
    // );

    if (getToken.status) {
      let options = {
        method: "post",
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken.mainToken}`,
        },
        url:
          "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc?" +
          paramers,
      };
      await axios(options)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log("error in creating order error message as follows: ");
          console.log(error);
        });
    } else {
      console.log("token recieval failed from the srlogin function");
    }
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
        console.log(response);
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

//POST || requesting pickup of a shipment
exports.setPickupFunction = async (req, res) => {
  let { shipment_id, pickup_date } = req.body;
  let paramers = "shipment_id=" + shipment_id;
  paramers += "&pickup_date=" + pickup_date;

  let getToken = await srlogin();
  console.log("below is the api key token recieved: ");
  console.log(getToken);

  if (getToken) {
    let options = {
      method: "post",
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken.mainToken}`,
      },
      url:
        "https://apiv2.shiprocket.in/v1/external/courier/generate/pickup?" +
        paramers,
    };

    await axios(options)
      .then(function (response) {
        console.log(response);
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
  let paramers = "shipment_id=" + shipment_id;
  let getToken = await srlogin();
  console.log("below is the api key token recieved");
  console.log(getToken);

  if (getToken) {
    let options = {
      method: "post",
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken.mainToken}`,
      },
      url:
        "https://apiv2.shiprocket.in/v1/external/manifests/generate?" +
        paramers,
    };

    await axios(options)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

//GET || getting shipment details by shipment id
exports.shipmentDetsFunction = async (req, res) => {
  let { shipment_id } = req.body;
  let paramers = "shipment_id=" + shipment_id;
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
      url: "https://apiv2.shiprocket.in/v1/external/shipments?" + paramers,
    };

    await axios(options)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

//POST || cancelling shipment by shipment id
exports.cancelShipmentFunction = async (req, res) => {
  let { awbs } = req.body; //array of awbs
  if (awbs != []) {
    let paramers = "awbs=" + awbs;
  } else {
    res.status(404).send({
      success: false,
      message: "No AWBs were sent",
    });
  }
  let getToken = await srlogin();
  console.log("below is the api key token recieved");
  console.log(getToken);

  if (getToken) {
    let options = {
      method: "post",
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken.mainToken}`,
      },
      url:
        "https://apiv2.shiprocket.in/v1/external/orders/cancel/shipment/awbs?" +
        paramers,
    };

    await axios(options)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

//POST || creating a return order
exports.createReturnOrderFunction = async (req, res) => {
  const {
    // pickup_location,
    order_id,
    order_date,
    channel_id,
    // comment,
    // reseller_name,
    // company_name,
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

  let paramers = "order_id=" + order_id;
  paramers += "&order_date=" + order_date;
  paramers += "&channel_id=" + channel_id;
  paramers += "&pickup_customer_name=" + pickup_customer_name;
  paramers += "&pickup_last_name=" + pickup_last_name;
  paramers += "&pickup_address=" + pickup_address;
  paramers += "&pickup_address_2=" + pickup_address_2;
  paramers += "&pickup_city=" + pickup_city;
  paramers += "&pickup_state=" + pickup_state;
  paramers += "&pickup_country=" + pickup_country;
  paramers += "&pickup_pincode=" + pickup_pincode;
  paramers += "&pickup_email=" + pickup_email;
  paramers += "&pickup_phone=" + pickup_phone;
  paramers += "&shipping_customer_name=" + shipping_customer_name;
  paramers += "&shipping_last_name=" + shipping_last_name;
  paramers += "&shipping_address=" + shipping_address;
  paramers += "&shipping_address_2=" + shipping_address_2;
  paramers += "&shipping_city=" + shipping_city;
  paramers += "&shipping_country=" + shipping_country;
  paramers += "&shipping_pincode=" + shipping_pincode;
  paramers += "&shipping_state=" + shipping_state;
  paramers += "&shipping_email=" + shipping_email;
  paramers += "&shipping_phone=" + shipping_phone;
  paramers += "&order_items=" + order_items;
  paramers += "&payment_method=" + "Prepaid";
  paramers += "&total_discount=" + total_discount;
  paramers += "&sub_total=" + sub_total;
  paramers += "&length=" + length;
  paramers += "&breadth=" + breadth;
  paramers += "&height=" + height;
  paramers += "&weight=" + weight;

  let getToken = await srlogin();
  console.log("below is the api key token recieved");
  console.log(getToken);

  if (getToken) {
    let options = {
      method: "post",
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken.mainToken}`,
      },
      url:
        "https://apiv2.shiprocket.in/v1/external/orders/create/return?" +
        paramers,
    };

    await axios(options)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
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
      email: "kotharibhavik2307@gmail.com",
      password: "hellomam",
      // email: "jb@bond.com",
      // password: "thenameisbond",
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
