import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./sign_in.css";
import "../sign_up/sign_up.css";
import axios from "axios";
import photo from "../../../assets/photo.png";
import google_icon from "../../../assets/google.png";
import Mask_group from "../../../assets/Mask_group.png";
import Tafi_logo_white from "../../../assets/Tafi_logo_white.png";
import { Link } from "react-router-dom";
import Header from "../../header/header";
import { useParams } from "react-router-dom";
var token;

const SignIn = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id);
  const [index, setIndex] = useState(id);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (id) {
      setIndex(id);
    }
  }, [id]);

  const [formField, setFormField] = useState({
    phone: "",
    otp: "",
  });

  const handleChangeFormField = (e) => {
    console.log(token);
    setFormField({ ...formField, [e.target.name]: e.target.value });
  };

  const onSendOtp = async (event) => {
    event.preventDefault();
    if (formField.phone.length == 10) {
      const { data } = await axios.post("http://localhost:8080/auth/sendOtp", {
        phone: formField.phone,
      });
      token = data.token;
      console.log(token);
    }
  };

  const onSignUp = async (event) => {
    event.preventDefault();
    if (token) {
      const { data } = await axios.post(
        "http://localhost:8080/auth/verifyOtp",
        {
          otp: formField.otp,
          token: token,
        }
      );
      if (data.success) {
        const { data } = await axios.post("http://localhost:8080/auth/signUp", {
          phone: formField.phone,
          userName: formField.name,
          email: formField.email,
        });
        if (data.success) {
          localStorage.setItem("auth_token", token);
          localStorage.setItem("user_id", data.data._id);
          navigate("/");
        }
      }
    }
  };

  const onTogglePage = (index) => {
    setIndex(index);
  };

  const onLogin = async (event) => {
    event.preventDefault();
    if (token) {
      const { data } = await axios.post("http://localhost:8080/auth/login", {
        phone: formField.phone,
        otp: formField.otp,
        token: token,
      });
      if (data.success) {
        localStorage.setItem("auth_token", token);

        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("user_id", data.data._id);
        navigate("/");
      }
    }
  };

  return (
    <>
      <Header />
      {index == 0 && (
        <div className="div sign_in">
          <div className="div-8">
            <div className="div-9">
              <div className="column">
                <div className="div-10">
                  <div className="div-11">
                    <img loading="lazy" src={Mask_group} className="img-2" />
                    <span className="span-4">
                      <img
                        loading="lazy"
                        src={Tafi_logo_white}
                        className="img-3"
                      />
                      <div className="div-12">
                        <div>
                          <span className="welcome-text">Welcome</span>
                        </div>
                        <div>
                          <span className="back-text">Back!</span>
                        </div>
                      </div>
                    </span>
                    <img loading="lazy" src={photo} className="img-4" />
                  </div>
                </div>
              </div>
              <div className="column-2">
                <span className="span-5">
                  <div className="div-13">Login Account</div>

                  <span className="span-6">
                    <div className="div-14" />

                    <div className="div-15">
                      <input
                        type="tel"
                        name="phone"
                        onChange={handleChangeFormField}
                        placeholder="Enter your phone number"
                      />
                      <button className="button_otp" onClick={onSendOtp}>
                        Generate otp
                      </button>
                    </div>
                  </span>
                  {/* <div className="input-phone">
                  <input type="tel" placeholder="Enter phone number" />
                </div> */}
                  <span className="span-7">
                    <div className="div-16" />
                    <div className="div-17">
                      <input
                        type="tel"
                        name="otp"
                        onChange={handleChangeFormField}
                        placeholder="Enter OTP"
                      />
                    </div>
                  </span>
                  <div className="checkbox">
                    <input type="checkbox" style={{ marginRight: "5px" }} />
                    Keep me signed in
                  </div>
                  <button className="span-9" onClick={onLogin}>
                    Login
                  </button>

                  <div className="div-20">
                    <span className="register-text">
                      Haven’t registered yet?{" "}
                    </span>
                    <Link
                      onClick={(e) => onTogglePage(1)}
                      className="create-account-text"
                    >
                      Create an account
                    </Link>
                  </div>
                  <div className="div-21">
                    <div className="div-22">
                      <img loading="lazy" src={google_icon} className="img-5" />
                    </div>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {index == 1 && (
        <div className="div sign_up">
          <div className="div-8">
            <div className="div-9">
              <div className="column-2">
                <span className="span-5">
                  <div className="div-13">Register</div>

                  <span className="span-6">
                    <div className="div-14" />

                    <div className="div-15">
                      <input
                        type="text"
                        name="name"
                        onChange={handleChangeFormField}
                        placeholder="Enter your username"
                      />
                    </div>
                  </span>

                  <span className="span-6">
                    <div className="div-14" />

                    <div className="div-15">
                      <input
                        type="tel"
                        name="phone"
                        onChange={handleChangeFormField}
                        placeholder="Enter your phone number"
                      />
                      <button className="button_otp" onClick={onSendOtp}>
                        Generate otp
                      </button>
                    </div>
                  </span>

                  <span className="span-7">
                    <div className="div-16" />
                    <div className="div-17">
                      <input
                        type="tel"
                        name="otp"
                        onChange={handleChangeFormField}
                        placeholder="Enter OTP"
                      />
                    </div>
                  </span>
                  <div className="checkbox">
                    <input type="checkbox" style={{ marginRight: "5px" }} />
                    Keep me signed in
                  </div>
                  <div className="register">
                    <button className="span-9" onClick={onSignUp}>
                      Register
                    </button>
                  </div>

                  <div className="div-20">
                    <span className="register-text">Already a user? </span>
                    <Link
                      onClick={(e) => onTogglePage(0)}
                      className="create-account-text"
                    >
                      Login
                    </Link>
                  </div>
                  <div className="div-21">
                    <div className="div-22">
                      <img loading="lazy" src={google_icon} className="img-5" />
                    </div>
                  </div>
                </span>
              </div>
              <div className="column">
                <div className="div-10">
                  <div className="div-11">
                    <img loading="lazy" src={Mask_group} className="img-2" />
                    <span className="span-4">
                      <img
                        loading="lazy"
                        src={Tafi_logo_white}
                        className="img-3"
                      />
                      <div className="div-12">
                        {/* <span className="welcome-text">Welcome</span> */}
                        <br />
                      </div>
                    </span>
                    <img loading="lazy" src={photo} className="img-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
