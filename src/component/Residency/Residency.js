import React from 'react';

import Aux from '../../hoc/Aux';


const residency = ( props ) => (

    <Aux>
        <div className="row passInfo">
            <div className="col-12">
                <div className=" pass-img row">
                    <div className="col-lg-8 col-md-6 col-12">
                    <img src={"https://flights.caduceuslane-digital.com/public/uploads/" + props.resdiency_image_data} alt="passport"/>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <ul>
                            <li>
                                <h5>Residency Number</h5>
                                <p>{props.resd_number_data}</p>
                            </li>
                            <li>
                                <h5>Issue Date </h5>
                                <p>{props.issue_date_data}</p>
                            </li>
                            <li>
                                <h5>Expiry Date</h5>
                                <p>{props.expire_date_data}</p>
                            </li>
                            <li>
                                <h5>Destination</h5>
                                <p>{props.destination_data}</p>
                            </li>
                        </ul>
                    </div>
                    {/* <h5>Passport Image</h5> */}
                    
                </div>
            </div>
            
        </div>      
    
    </Aux> 
);
 
export default residency;