import React, { useState } from 'react';
import $ from 'jquery'; 
import 'dropify/dist/js/dropify.js';
import Aux from '../../hoc/Aux';


const residencyForm = ( props ) => (
    <Aux>      
        <div className="form-row last-tab">
            <div className="form-group col-12">
                <label htmlFor="residencytNumber">Residency Number</label>
                <input type="text" className="form-control" id="residencytNumber" name="resd_number[]" value={props.resd_number_data} onChange={(event) => ({national: event.target.value})} placeholder="Residency Number" />
            </div>
            <div className="form-group col-12">
                <label htmlFor="issueDate">Issue Date</label>
                <input type="text" className="form-control" id="issueDate" name="issue_date[]" value={props.passport_number} onChange={(event) => ({passport_number: event.target.value})} placeholder="Issue Date" />
            </div>
            <div className="form-group col-12">
                <label htmlFor="expiryDate">Expiry date</label>
                <input type="text" className="form-control" id="expiryDate" name="expire_date[]" value={props.expire_date_data} onChange={(event) => ({expire_date_data: event.target.value})} placeholder="Expiry date" />
            </div>
            <div className="form-group col-12">
                <label htmlFor="destination">Destination</label>
                <input type="text" className="form-control" id="destination" name="destination[]" value={props.destination_data} onChange={(event) => ({destination_data: event.target.value})} placeholder="Destination" />
            </div>
            <div className="form-group col-12 resImg">
            <label htmlFor="input-file-now">Residency Image</label>
            <input type="file" id="input-file-now" className="dropify" name="resdiency_image[]" data-default-file={"https://flights.caduceuslane-digital.com/public/uploads/" + props.resdiency_image_data} placeholder="Residency Image"/>
            </div>
            <div className="col-12 text-right add-visa">
                <button type="button" className="btn-add">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                    <span>ADD VISA</span>
                </button>
            </div>
        </div>
    </Aux> 
);
 
export default residencyForm;