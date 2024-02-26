import React from "react";
import map from "../../assets/mapp.png";
import "./map.css";

const Map = () => {
  return (
    <div className="div4  ">
      <div className="franchisemain row">
        <div className="soilDiv col-md-7 col-sm-6">
          <div className="franchiseInfo">
            <div className="franchHeading">
              <h1>
                70<span>+</span>
              </h1>
              <h3 className="exclusive">
                EXCLUSIVE <br /> STORES OVER
              </h3>
              <h3>
                <span>INDIA</span>
              </h3>
              <div className="franchSubHead">
                <h6>
                  Ready to take your farming <br />
                  journey to the <span> Next Level?</span>
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="franDiv col-md-5 col-sm-6">
          <div className="map-image w-100">
            <img src={map} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Map;
