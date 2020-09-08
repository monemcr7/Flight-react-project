import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import EmployeeFlight from '../EmoloyeeFlight/EmoloyeeFlight';
import EmployeeAccommodation from '../EmoloyeeAccommodation/EmoloyeeAccommodation';
// import UserFlight from '../'
// import axios from '../../axios';

class EmployeesRequests extends Component {
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
        return <EmployeeAccommodation />;
      }
      
      const UserFlight = (props) => {
        return <EmployeeFlight/>;
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
                    <div className="col-6">
                        <h1 className="page-title">Accommodation Requests for my Employees</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-right add-cards-btn">
                    <div className="header-search">
                    <div className="toggle-content">
                            <span className="flights text-toggle ">Flights</span>
                            <span className="toggle-line" onClick={props.onClick}>
                                <span className="toggle-circle right"></span>
                            </span>
                            <span className="accommodation text-toggle active">Accommodation</span>
                        </div>
                    </div>
                    </div>
                </div>
        </div>
        
        );
    }

    const FlightsButton = (props) => {
        return (
            <div>
                <div className="row">
                    <div className="col-6">
                        <h1 className="page-title">Flight Requests for my Employees</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-right add-cards-btn">
                        <div className="header-search">
                            <div className="toggle-content">
                                <span className="flights text-toggle active">Flights</span>
                                <span className="toggle-line" onClick={props.onClick}>
                                    <span className="toggle-circle left"></span>
                                </span>
                                <span className="accommodation text-toggle">Accommodation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    

export default EmployeesRequests;