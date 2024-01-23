import React from "react";
import "./about.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import tafilogo from "./../../assets/about-logo.png";
import tech from "../../assets/about-tech.png";
const About = () => {
  return (
    <div>
      <Header />
      <div className="about">
        <div className="about-hero">
          <div className="row">
            <div className="about-logo col-5">
              <div className="about-logo-img">
                <img src={tafilogo} alt="" />
              </div>
            </div>
            <div className="about-hero-text col-7">
              <div className="about-hero-head">
                <h2>
                  <span className="about-text">About</span>
                  <span className="tafi-text">Tafi</span>
                </h2>
                <p>
                  Established in 2022,<b> TAFI </b>is a comprehensive ecosystem
                  of agro-tech products designed to serve the agricultural
                  sector. As a <b>one-stop platform</b>, TAFI offers tailored
                  solutions and convenient services to address the unique needs
                  of our customers. We aim to enhance the farming experience by
                  providing agriculture-related services that are customized and
                  easy to access.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="about-vision-mission">
          <div className="about-card">
            <div className="about-card-main">
              <div className="card-vision">
                <div class="tile-circle"></div>
                <span className="vision-head">
                  <h4>
                    <span className="our-text">Our </span>
                    <span className="vision-text">Vision</span>
                  </h4>
                </span>
                <span className="vision-description">
                  <p>
                    Create such an era where solutions, products, knowledge and
                    services related to agriculture can reach the consumers
                    quickly and easily.
                  </p>
                </span>
              </div>
              <div className="card-mission">
                <div class="tile-circle"></div>
                <span className="mission-head">
                  <h4>
                    <span className="our-text">Our </span>
                    <span className="mission-text">Mission</span>
                  </h4>
                </span>
                <span className="mission-description">
                  <p>
                    Create such an era where solutions, products, knowledge and
                    services related to agriculture can reach the consumers
                    quickly and easily.
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="about-tech-we-have">
          <div className="tech-we-have-img">
            <div className="tech-head">
              <h4>
                <span className="tech-text">Technologies </span>{" "}
                <span className="vision-text">We Offer</span>
              </h4>
            </div>
            <div className="tech-img tech-back-img">
              <div className="numbers"></div>
              <img src={tech} alt="" />
            </div>
            <div className="tech-keywords">
              <div className="tech-back-img">
                <div className="buttons row">
                  <div className="col">
                    <div>
                      <div className="num">1</div>
                      <p className="block1">Smart Irrigation Systems</p>
                    </div>
                  </div>
                  <div className="col">
                    <div>
                      <div className="num">2</div>
                      <p className="block2">Drones and UAVs</p>
                    </div>
                  </div>
                  <div className="col">
                    <div>
                      <div className="num">3</div>
                      <p className="block3">Surveillance</p>
                    </div>
                  </div>
                  <div className="col">
                    <div>
                      <div className="num">4</div>
                      <p className="block4">Greenhouse</p>
                    </div>
                  </div>
                  <div className="col">
                    <div>
                      <div className="num">5</div>
                      <p className="block5">Climate Monitoring</p>
                    </div>
                  </div>
                  <div className="col">
                    <div>
                      <div className="num">6</div>
                      <p className="block6">High Tech Machinery</p>
                    </div>
                  </div>
                  <div className="col">
                    <div>
                      <div className="num">7</div>
                      <p className="block7">Precision Agriculture</p>
                    </div>
                  </div>
                  <div className="col">
                    <div>
                      <div className="num">8</div>
                      <p className="block8">Biological Pest Control</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default About;
