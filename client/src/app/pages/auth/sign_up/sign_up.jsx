import React, { useState } from "react";

import './sign_up.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

let token = undefined;
const SignUp = () => {

    const navigate = useNavigate();
    const [formField, setFormField] = useState({
        phone: "",
        name: "",
        email: "",
        otp: ""
    });

    const handleChangeFormField = (e) => {
        setFormField({ ...formField, [e.target.name]: e.target.value });
    }

    const onSendOtp = async (event) => {
        event.preventDefault();
        if (formField.phone.length == 10) {
            const { data } = await axios.post('http://localhost:8080/auth/sendOtp', {
                phone: formField.phone
            });
            token = data.token;
        }
    };

    const onSignUp = async (event) => {
        event.preventDefault();
        if (token) {
            const { data } = await axios.post('http://localhost:8080/auth/verifyOtp', {
                otp: formField.otp,
                token: token
            });
            if (data.success) {
                const { data } = await axios.post('http://localhost:8080/auth/signUp', {
                    phone: formField.phone,
                    userName: formField.name,
                    email: formField.email,
                });
                if (data.success) {
                    localStorage.setItem('auth_token', token);
                    localStorage.setItem('user_id', data.data._id);
                    navigate("/");
                }
            }
        }
    };

    return (
        <div className="signUp">
            <div className="signUpform">
                <h2 className="signUp-head">
                    Signup
                </h2>
                <form>
                    <div className="email-mob">
                        <label>User name</label>
                        <input type="text" name='name' onChange={handleChangeFormField} />
                    </div>
                    <div className="email">
                        <label>email</label>
                        <input type="email" name='email' onChange={handleChangeFormField} />
                        <label>Mobile number</label>
                        <input type="number" name='phone' onChange={handleChangeFormField} />
                        <button onClick={onSendOtp}>Send OTP</button>
                        <label>OTP</label>
                        <input type="number" name='otp' onChange={handleChangeFormField} />

                    </div>
                    <div>
                        <button onClick={onSignUp}>SIGN UP</button>
                    </div>

                </form>
                <div className="divider"></div>
                <div className="social-signup">
                    <h4> or signup with</h4>


                </div>

            </div>

        </div>
    )

};

export default SignUp;