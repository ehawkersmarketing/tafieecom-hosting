import React from "react";

import PopUp from '../../assets/pop_up.png'
import './Service_pop.css'

const Service_pop = ({ item }) => {
    return (
        <div className="service-pop-main" id="servicemodal">
            <div className="service-pop-submain row">
                <div className="service-pop-image col-5">
                    <img src={item?.image} />
                </div>
                <div className="service-pop-text col-7">
                    <div className="service-pop-heading-text">{item?.title}</div>
                    <div className="service-pop-subtext"><p>{item?.description}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Service_pop