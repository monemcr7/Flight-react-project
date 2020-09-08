import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../hoc/Aux';
import FlightHistory from '../FlightHistory/FlightHistory';
import AccommodationHistory from '../AccommodationHistory/AccommodationHistory';
import FlightHistoryForm from '../FlightHistoryForm/FlightHistoryForm'

class HistoryEmployees extends Component {
    constructor(props) {
        super(props);
        this.handleFlightsClick = this.handleFlightsClick.bind(this);
        this.handleAccommodationClick = this.handleAccommodationClick.bind(this);
        this.state = {isAccommodation: false};
    }
    

    handleFlightsClick() {
        this.setState({isAccommodation: true});
    }
    
    handleAccommodationClick() {
        this.setState({isAccommodation: false});
    }

    
    render() {
        const isAccommodation = this.state.isAccommodation;

        let button;

        if (isAccommodation) {
            button = <AccommodationButton onClick={this.handleAccommodationClick} />;
        } else {
            button = <FlightsButton onClick={this.handleFlightsClick} />;
        }
        return (
            <Aux>      
                {button}
                <Toggleing isAccommodation={isAccommodation} />
            </Aux> 
        );
    }
    }

    const UserAccommodation = (props) => {
      // <h1>test</h1>
        return <AccommodationHistory />;
    }
    
    const UserFlight = (props) => {
        return <FlightHistory/>;
    }
    
    const Toggleing = (props) => {
        const isAccommodation = props.isAccommodation;
        if (isAccommodation) {
        return <UserAccommodation />;
        }
        return <UserFlight />;
    }
    
    const AccommodationButton = (props) => {
        return (
        <div>
            <div className="row">
                <div className="col-12">
                    <h1 className="page-title">Accommodation History</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-12 ">
                    <div className="header-search row">
                        <div className="col-lg-9 col-12">
                            <form className="search-form history-form">
                                <div className="form-row">
                                    <div className="form-group purpose-search">
                                        <select className="form-control" id="purpose" placeholder="Purpose" name="purpose">
                                            <option value="0">All Purpose</option>
                                            <option value="1">Business Trip</option>
                                            <option value="2">Annual Leave</option>
                                        </select>
                                        <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="start_date" id="datepicker" placeholder="Start Date" value=""/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="end_date" id="datepicker2" placeholder="End Date" value=""/>
                                    </div>
                                    <button type="" className="btn btn-info searchBtn"><i className="fa fa-search" aria-hidden="true"></i></button>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-3 col-12 text-right">
                            <div className="toggle-content">
                                <span className="flights text-toggle ">Flight</span>
                                <span className="toggle-line" onClick={props.onClick}>
                                    <span className="toggle-circle right"></span>
                                </span>
                                <span className="accommodation text-toggle active">Accommodation</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12">
                    <hr className="divider"/>
                </div>
            </div>

            
        </div>
        
        );
    }

    const FlightsButton = (props) => {
        return (
        <div>
            <div className="row">
                <div className="col-12">
                    <h1 className="page-title">Flight History</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-12 ">
                    <div className="header-search row">
                        <div className="col-lg-9 col-12">
                            <FlightHistoryForm />
                        </div>
                        <div className="col-lg-3 col-12 text-right">
                            <div className="toggle-content">
                                <span className="flights text-toggle active">Flight</span>
                                <span className="toggle-line" onClick={props.onClick}>
                                    <span className="toggle-circle left"></span>
                                </span>
                                <span className="accommodation text-toggle">Accommodation</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12">
                    <hr className="divider"/>
                </div>
            </div>

            
        </div>
        );
    }

    

export default HistoryEmployees;


