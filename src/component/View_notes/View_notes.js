import React from 'react';
import Aux from '../../hoc/Aux';


const viewNotes = ( props ) => (

    <Aux>      
        <div className="row note-sec">
            <div className="notes-content">
                <h2 className="sec-title">Note</h2>
                <p>{props.noteText}</p>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12">
                <hr className="divider"/>
            </div>
        </div>
    </Aux> 
);

export default viewNotes;