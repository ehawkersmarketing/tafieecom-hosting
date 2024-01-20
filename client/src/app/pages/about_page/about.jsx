import React from "react";
import './about.css'
import Header from "../header/header";
import tafilogo from "./../../assets/tafi-logo.png";
const About = () =>{
    return(
        <div className="about">
            <Header/>
            <div className="about-hero">
                <div className="about-logo"> 
                    <div className="about-logo-img">
                        <img src={tafilogo} alt="" />
                    </div>
                </div>
                <div className="about-hero-text">
                    <div>
                        <div className="about-hero-head">
                            <h2>
                                <span>About</span> <span>Tafi</span>
                            </h2>
                            <p>
                                Established in 2022, TAFI is a comprehensive ecosystem of agro-tech products designed to serve the agricultural sector. As a one-stop platform, TAFI offers tailored solutions and convenient services to address the unique needs of our customers. We aim to enhance the farming experience by providing agriculture-related services that are customized and easy to access.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );

};
export default About;