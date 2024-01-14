import React from 'react';
import { useNavigate } from "react-router-dom";
import './header.css';

const Header = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const token = localStorage.getItem("token");
    const viewCart = () => {
        navigate("/viewPost");
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
            <h1>Blog</h1>
            <div className='content'>
                {token && <button className="button" onClick={() => toDashboard()}>Admin Panel</button>}
                <button className="button" onClick={() => token ? viewCart() : navigate("/auth/login")}>{token ? "Create Post" : "Login"}</button>
                {token && <button className="button" onClick={() => onLogout()}>LOGOUT</button>}
            </div>
        </nav>

    )
}


export default Header;