import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import "../create_product/createProduct.css";
const UpdateUser = () => {
  const history = useNavigate();
  const { id } = useParams();
  const [inputHandler, setInputHandler] = useState({
    id: id,
    userName: "",
    phone: "",
    email: "",
    dob: "",
    street: "",
    landMark: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
  });
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [maxDate, setMaxDate] = useState('');
  useEffect(() => {
    if (user) {
      if (user.role.role !== "User") {
        history("/auth/login");
      } else {
        history(`/updateUser/${id}`);
      }
    } else {
      history("/auth/login");
    }
  }, []);

  const getOneUser = async () => {
    try {
      const { data: user } = await axios.get(
        `http://localhost:8080/auth/user/${id}`
      );
      const { data: userAddress } = await axios.get(
        `http://localhost:8080/api/getUserAddress/${id}`
      );
      let date = new Date(user.data.dob);
      let day = date.getDay();
      if (day < 10) {
        day = "0" + day;
      }
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let year = date.getFullYear();
      setInputHandler({
        ...inputHandler,
        ["street"]: userAddress.data.street,
        ["city"]: userAddress.data.city,
        ["landMark"]: userAddress.data.landmark,
        ["zipCode"]: userAddress.data.zipCode,
        ["country"]: userAddress.data.country,
        ["state"]: userAddress.data.state,
        ["userName"]: user.data.userName,
        ["phone"]: user.data.phone,
        ["email"]: user.data.email,
        ["dob"]: `${year}-${month}-${day}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOneUser();
  }, []);

  const onChangeInputHandler = (e) => {
    if (e.target.name === "phone" ) {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    }
    const { name, value } = e.target;

    setInputHandler(() => {
      return { ...inputHandler, [name]: value };
    });
  };
  useEffect(() => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    setMaxDate(today);
}, []);

  const backToDashboard = () => {
    history(`/myaccount/${id}`);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if(inputHandler.email === ""){
      alert("Enter Email")
    }else if(inputHandler.userName===""){
      alert("Enter the UserName")
    }else if(inputHandler.phone===""){
      alert("Enter the phone number")
    }else if(inputHandler.street===""){
      alert("Enter the Street")
    }else if(inputHandler.zipCode===""){
      alert("Enter the zipcode")
    }else if(inputHandler.landMark===""){
      alert("Enter the landmark")
    }else if(inputHandler.city===""){
      alert("Enter city")
    }else if(inputHandler.country===""){
      alert("Enter country")
    }else if(inputHandler.state===""){
      alert("Enter State")
    }else{
      await axios.post(`http://localhost:8080/api/putUserAddress`, {
        userId: id,
        email: inputHandler.email,
        dob: inputHandler.dob,
        phone: inputHandler.phone,
        street: inputHandler.street,
        landmark: inputHandler.landMark,
        city: inputHandler.city,
        userName: inputHandler.userName,
        country: inputHandler.country,
        state: inputHandler.state,
        zipCode: inputHandler.zipCode,
      });
      backToDashboard();
    }
    
  };

  return (
    <>
      <Header />
      <section>
        <div className="form_data">
          <div className="cross" onClick={backToDashboard}>
            <i class="bi bi-file-x-fill"></i>
          </div>
          <div className="form_heading">
            <h1>Update User</h1>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="title">User Name</label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                id="userName"
                name="userName"
                value={inputHandler.userName}
                placeholder="userName"
              />
            </div>
            <div className="form_input">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                id="phone"
                name="phone"
                value={inputHandler.phone}
                placeholder="phone"
                maxLength={10}
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={onChangeInputHandler}
                id="email"
                name="email"
                value={inputHandler.email}
                placeholder="Email ..."
              />
            </div>
            <div className="form_input">
              <label htmlFor="DOB">DOB</label>
              <input
               type="date"
               onChange={onChangeInputHandler}
               id="dob"
               name="dob"
               value={inputHandler.dob}
               placeholder="Date ..."
              //  maxLength={Date.now()}
              max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="form_input">
              <label htmlFor="phone">Street</label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                id="street"
                name="street"
                value={inputHandler.street}
                placeholder="Street..."
              />
            </div>
            <div className="form_input">
              <label htmlFor="landMark">landMark</label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                id="landMark"
                name="landMark"
                value={inputHandler.landMark}
                placeholder="Land Mark..."
              />
            </div>
            <div className="form_input">
              <label htmlFor="city">City</label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                id="city"
                name="city"
                value={inputHandler.city}
                placeholder="City..."
              />
            </div>
            <div className="form_input">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                id="country"
                name="country"
                value={inputHandler.country}
                placeholder="Country..."
              />
            </div>
            <div className="form_input">
              <label htmlFor="zipCode">zipCode</label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                id="zipCode"
                name="zipCode"
                value={inputHandler.zipCode}
                placeholder="zipCode..."
              />
            </div>
            <div className="form_input">
              <label htmlFor="state">State</label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                id="state"
                name="state"
                value={inputHandler.state}
                placeholder="State..."
              />
            </div>

            <button className="btn" onClick={onSubmitHandler}>
              update User
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default UpdateUser;
