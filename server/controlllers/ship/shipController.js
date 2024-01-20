const crypto = require("crypto");
const axios = require("axios");
const uniqid = require("uniqid");
const { setTimeout } = require("timers");

exports.calcShipment = async (req, res) => {
  const { pickup_postcode, delivery_postcode, weight, delivery_value } =
    req.body;
  res.status(200).send({
    success: true,
    message: "calculate shipment controller triggered",
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////
  //++++++++++++++++++++++++++++++++++++++++++++++++++
  let rs_data = await srShippingRateCalculation(
    pickup_postcode,
    delivery_postcode,
    weight,
    // "xyzORDER_ID",
    delivery_value
  );
  //++++++++++++++++++++++++++++++++++++++++++++++++++
  //   res.status(200).json(rs_data);
  console.log(rs_data.mainset.data.available_courier_companies);
  //++++++++++++++++++++++++++++++++++++++++++++++++++
  //Function ShippingRateCalculation
  function srShippingRateCalculation(
    pickup_postcode,
    delivery_postcode,
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
        console.log(getToken);
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        let parmers = "pickup_postcode=" + pickup_postcode;
        parmers += "&delivery_postcode=" + delivery_postcode;
        parmers += "&weight=" + weight;
        // parmers += "&order_id=" + order_id;
        parmers += "&cod=0";
        parmers += "&declared_value=" + declared_value;
        parmers += "&rate_calculator=1";
        parmers += "&blocked=1";
        parmers += "&is_return=0";
        parmers += "&is_web=1";
        parmers += "&is_dg=0";
        parmers += "&only_qc_couriers=0";
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        if (getToken.status) {
          var options = {
            method: "get",
            maxBodyLength: Infinity,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken.mainToken}`,
            },
            url:
              "https://apiv2.shiprocket.in/v1/external/courier/serviceability?" +
              parmers,
          };
          axios(options)
            .then(function (response) {
              resData.status = true;
              resData.message = "Success!!";
              resData.mainset = response.data;
              resolve(resData);
            })
            .catch(function (error) {
              //++++++++++++++++++++++++++++++++++++
              console.log(error);
              console.log("srShippingRateCalculation");
              //++++++++++++++++++++++++++++++++++++
              resData.status = false;
              resData.message = "Error!!";
              resData.mainset = JSON.stringify(error);
              reject(resData);
            });
        } else {
          //+++++++++++++++++++++++++++++++++++++++++
          console.log("srShippingRateCalculation");
          //+++++++++++++++++++++++++++++++++++++++++
          resData.status = false;
          resData.message = "Error!!";
          reject(resData);
        }
      } catch (e) {
        //+++++++++++++++++++++++++++++++++++++++++
        console.error(e);
        // console.log("srShippingRateCalculation");
        //+++++++++++++++++++++++++++++++++++++++++
        reject(resData);
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////
};

exports.createShipment = async (req, res) => {
  const { pickup_postcode, delivery_postcode, weight, delivery_value } =
    req.body;

  let newShipData = await newShipFunction();

  async function newShipFunction() {
    let getToken = await srlogin();
    console.log("below is the api key token recieved");
    console.log(getToken);

    let parmers = "pickup_postcode=" + pickup_postcode;
    parmers += "&order_id=" + order_id; //mandatory
    parmers += "&order_date=" + Date.now(); //mandatory
    parmers += "&pickup_location=" + "Indore";
    // parmers += "&comment=" + comment;
    parmers += "&billing_customer_name=" + billing_customer_fname; //billing customer name
    parmers += "&billing_last_name=" + billing_customer_lname; //billing customer last name
    parmers += "&billing_address=" + billing_address; //billing address 1
    parmers += "&billing_address_2=" + billing_address_2; //billing address 2
    parmers += "&billing_city=" + billing_city; //billing city mand.
    parmers += "&billing_pincode=" + billing_pincode; //billing pincode mand.
    parmers += "&billing_statee=" + billing_state; //billing state mand.
    parmers += "&billing_country=" + billing_country; //billing country mand.
    parmers += "&billing_email=" + billing_email; //billing email mand.
    parmers += "&billing_phone=" + billing_phone; //billing phone mand.
    parmers += "&delivery_postcode=" + delivery_postcode; //billing phone alt.
    parmers += "&billing_customer_name=" + billing_customer_fname; //shipping customer fname//IF ADDRESS HAS SEPARATE CUSTOMER NAME FUNCTION CHANGE HERE
    parmers += "&billing_customer_name=" + billing_customer_lname; //shipping customer lname
    parmers += "&shipping_is_billing=" + 0; //billing billing is shipping mand.
    parmers += "&shipping_address=" + delivery_postcode; //billing shipping address mand. if shipping not billing
    parmers += "&shipping_address_2=" + delivery_postcode; //billing shipping address 2 mand. if shipping not billing
    parmers += "&shipping_city=" + delivery_postcode; //billing shipping city mand. if shipping not billing
    parmers += "&shipping_pincode=" + delivery_postcode; //billing shipping pincode mand. if shipping not billing
    parmers += "&shipping_country=" + delivery_postcode; //billing shipping country mand. if shipping not billing
    parmers += "&shipping_state=" + delivery_postcode; //billing shipping state mand. if shipping not billing
    parmers += "&shipping_email=" + delivery_postcode; //billing shipping email  if shipping not billing
    parmers += "&shipping_phone=" + delivery_postcode; //billing shipping phone mand. if shipping not billing
    parmers += "&order_items=" + order_items_array; //order items mand.
    parmers += "&weight=" + weight;
    parmers += "&cod=0";
    parmers += "&declared_value=" + declared_value;
    parmers += "&rate_calculator=1";
    parmers += "&blocked=1";
    parmers += "&is_return=0";
    parmers += "&is_web=1";
    parmers += "&is_dg=0";
    parmers += "&only_qc_couriers=0";
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if (getToken.status) {
      var options = {
        method: "get",
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken.mainToken}`,
        },
        url:
          "https://apiv2.shiprocket.in/v1/external/courier/serviceability?" +
          parmers,
      };
      axios(options)
        .then(function (response) {
          resData.status = true;
          resData.message = "Success!!";
          resData.mainset = response.data;
          resolve(resData);
        })
        .catch(function (error) {
          //++++++++++++++++++++++++++++++++++++
          console.log(error);
          console.log("srShippingRateCalculation");
          //++++++++++++++++++++++++++++++++++++
          resData.status = false;
          resData.message = "Error!!";
          resData.mainset = JSON.stringify(error);
          reject(resData);
        });
    } else {
    }
  }
};
//Function Login For Authentication and token recieval REQUIRED FOR ALL API CALLS
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
      email: "jb@bond.com",
      password: "thenameisbond",
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
      reject(resData);
    }
  });
}
