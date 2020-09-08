import React from 'react';
import Aux from '../../hoc/Aux';


const viewComment = ( props ) => (

    <Aux>      
        <div className="comment">
            <div className="user-image">
                <img src={require("../../assets/img/blank-avatar.png")} alt="user"/>
            </div>
            <div className="comment-info">
                <div className="userName"> {props.commedtData.full_name}</div>
                <p>
                    {props.commedtData.comment_text}
                </p>
                <button className="btn btn-light full-history">
                    <i className="fa fa-history" aria-hidden="true"></i> Full History
                </button>
            </div>
        </div>
    </Aux> 
);

export default viewComment;