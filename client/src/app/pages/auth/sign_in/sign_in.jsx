import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './sign_in.css'
import axios from "axios";
var token;

const SignIn = () => {
    const navigate = useNavigate();
    const [formField, setFormField] = useState({
        phone: "",
        otp: ""
    });

    const handleChangeFormField = (e) => {
        console.log(token);
        setFormField({ ...formField, [e.target.name]: e.target.value });
    }

    const onSendOtp = async (event) => {
        event.preventDefault();
        if (formField.phone.length == 10) {
            const { data } = await axios.post('http://localhost:8080/auth/sendOtp', {
                phone: formField.phone
            });
            token = data.token;
            console.log(token);
        }
    };

    const onLogin = async (event) => {
        event.preventDefault();
        if (token) {
            const { data } = axios.post('http://localhost:8080/auth/login', {
                phone: formField.phone,
                otp: formField.otp,
                token: token
            });
            if (data.success) {
                localStorage.setItem('auth_token', token);
                localStorage.setItem('user_id', data.data._id);
                navigate("/");
            }
        }
    };

    return (
        <div className="signin">
            <div className="signinform">
                <h2 className="signin-head">
                    Signin
                </h2>
                <form>
                    <div className="email-mob">
                        <label>Email ID / Mobile number</label>
                        <input type="text" name='phone' onChange={handleChangeFormField} />
                        <button onClick={onSendOtp}>Send OTP</button>
                    </div>
                    <div className="otp">
                        <label>OTP</label>
                        <input type="text" name='otp' onChange={handleChangeFormField} />

                    </div>
                    <div>
                        <button onClick={onLogin}>LOGIN</button>
                    </div>

                </form>
                <div className="divider"></div>
                <div className="social-login">


                </div>

            </div>

        </div>
    )

};

export default SignIn;