import React from 'react';
import { useNavigate } from "react-router-dom";
import './header.css';
import { useSelector } from 'react-redux';
const Header = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const token = localStorage.getItem("auth_token");
    const viewCart = () => {
        navigate("/viewCart");
    }

    const onLogout = () => {
        localStorage.clear();
        navigate("/auth/login");
    };

    const toDashboard = () => {
        if (user.role.role === "admin") {
            navigate("/adminDashboard");
        }
    }

    return (
        <nav class="navbar fixed-top navbar-light bg-light">
            <h1>TEFIE</h1>
            <div className='content'>
                {token && <button className="button" onClick={() => toDashboard()}>Admin Panel</button>}
                <button className="button" onClick={() => token ? viewCart() : navigate("/auth/login")}>{token ? "View Cart" : "Login"}</button>
                {token && <button className="button" onClick={() => onLogout()}>LOGOUT</button>}
            </div>
        </nav>

    )
}


export default Header;