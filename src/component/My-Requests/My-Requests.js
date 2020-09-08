import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../hoc/Aux';
import UserFlightCards from '../UserFlight/UserFlight';
import UserAccommodationCards from '../UserAccommodation/UserAccommodation';
// import UserFlight from '../'
// import axios from '../../axios';

class my_requests extends Component {
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
                <div className="row">
                    <div className="col-6">
                        <h1 className="page-title">My Requests</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-right add-cards-btn">
                      <div className="header-search">
                          {button}
                      </div>
                    </div>
                </div>
                <Toggleing isAccommodation={isAccommodation} />
            </Aux> 
        );
      }
    }

    const UserAccommodation = (props) => {
      // <h1>test</h1>
        return <UserAccommodationCards />;
      }
      
      const UserFlight = (props) => {
        return <UserFlightCards/>;
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
            <div className="toggle-content">
                <span className="flights text-toggle ">Flights</span>
                  <span className="toggle-line" onClick={props.onClick}>
                    <span className="toggle-circle right"></span>
                  </span>
                <span className="accommodation text-toggle active">Accommodation</span>
            </div>
            
            <Link to="/Add_Accommodation" className="btn btn-info"><i className="fa fa-bed" aria-hidden="true"></i> Accommodation</Link>
          </div>
          
        );
      }
      
      const FlightsButton = (props) => {
        return (
          <div>
            <div className="toggle-content">
              <span className="flights text-toggle active">Flights</span>
              <span className="toggle-line" onClick={props.onClick}>
                <span className="toggle-circle left"></span>
              </span>
              <span className="accommodation text-toggle">Accommodation</span>
            </div>
            <Link to="/Add_Flight" className="btn btn-info"><i className="fa fa-plane" aria-hidden="true"></i>Add Flight</Link>
          </div>
        );
      }

    

export default my_requests;