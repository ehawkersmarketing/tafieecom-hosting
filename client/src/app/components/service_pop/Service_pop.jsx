import React from "react";

import PopUp from '../../assets/pop_up.png'
import './Service_pop.css'

const Service_pop = () => {
    return(
        <div className="service-pop-main">
            <div className="service-pop-submain row">
                <div className="service-pop-image col-5">
                    <img src={PopUp} />
                </div>
                <div className="service-pop-text col-5">
                    <div className="service-pop-heading-text">POLY HOUSE</div>
                        <div className="service-pop-subtext"><p>Environment-friendly structure made of 
                            polythene sheet for the cultivation of high quality and exotic crops. 
                            Which creates high quality and high yield by creating crop-friendly behavior.</p>
                        </div>
                        <div className='service-pop'>
                            <button className="d-flex" type="link"> <div><strong>Show Interest</strong></div><i class="bi bi-whatsapp"></i></button>
                        </div>
                </div>   
            </div>
        </div>
    )
}

export default Service_pop