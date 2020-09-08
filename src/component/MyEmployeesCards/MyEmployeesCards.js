import React from 'react';
import Aux from '../../hoc/Aux';


const myEmmployeesCards = ( props ) => (
    
    <Aux>      
        <div className="col-lg-4 col-md-6 col-12">
            <div className=" request-card shadow-sm  bg-white rounded">
                <div className="cards-img">
                    <div className="user-img">
                    <img src={props.image_profile} alt="user"/>
                    </div>
                    <div className="user-info">
                        {props.employee_name}
                    <span>{props.level_id}</span>
                    </div>
                </div>
                <div className="card-btn row">
                    <div className="col-sm-12 padding0">
                        <a href="view-request.html" className="btn btn-info">VIEW</a>
                    </div>
                </div>
            </div>
        </div>
    </Aux> 
);

export default myEmmployeesCards;