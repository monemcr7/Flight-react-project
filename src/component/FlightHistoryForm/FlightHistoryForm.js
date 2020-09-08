import React, {Component} from 'react';
import axios from '../../axios';
import $ from 'jquery'; 
import Aux from '../../hoc/Aux';

class FlightHistoryForm extends Component {
    state = {
        dataRusult : [],
        cardList : [],
        employee_from_name : '',
        purpose_id : '',
        date_time : '',
        error : false
    }


    FlightHistoryDataHandler = () => {
        const data = {
            purpose_id: this.state.purpose_id,
            date_time: this.state.date_time
        };
        axios.post('https://flights.caduceuslane-digital.com/api/flightHistory', data)
            .then(response => {
                console.log(response);
            });
    }
    

    render() {
    return (
        <Aux>
            <div className="search-form history-form">
                <div className="form-row">
                    <div className="form-group purpose-search">
                        <select className="form-control" id="purpose"  
                        placeholder="Purpose" name="purpose" 
                        value={this.state.purpose_id} onChange={(event) => this.setState({purpose_id: event.target.value})}>
                            <option value="All Purpose">All Purpose</option>
                            <option value="Business Trip">Business Trip</option>
                            <option value="Annual Leave">Annual Leave</option>
                        </select>
                        <i className="fa fa-chevron-down" aria-hidden="true"></i>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="start_date" id="datepicker" placeholder="Start Date" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="end_date" id="datepicker2" placeholder="End Date" />
                    </div>
                    <button onClick={this.FlightHistoryDataHandler} className="btn btn-info searchBtn"><i className="fa fa-search" aria-hidden="true"></i></button>
                </div>
            </div>
        </Aux>
    )
    }
}


export default FlightHistoryForm;