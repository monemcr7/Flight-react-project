import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../hoc/Aux';
import Card from '../Card/Card';


class ToggleButton extends Component {
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
                <div className="toggle-content">
                    <span className="flights text-toggle active">Flights</span>
                    {button}
                    <span className="accommodation text-toggle">Accommodation</span>
                </div>
                <Greeting isAccommodation={isAccommodation} />
            </Aux> 
        );
      }
    }

    const UserGreeting = (props) => {
      // <h1>test</h1>
      return <Card />;
      }
      
      const GuestGreeting = (props) => {
        // <h1>test1</h1>
        return <h1>test1</h1>;
      }
      
      const Greeting = (props) => {
        const isAccommodation = props.isAccommodation;
        if (isAccommodation) {
          return <UserGreeting />;
        }
        return <GuestGreeting />;
      }
      
      const AccommodationButton = (props) => {
        return (
          <span className="toggle-line" onClick={props.onClick}>
              <span className="toggle-circle right"></span>
          </span>
        );
      }
      
      const FlightsButton = (props) => {
        return (
          <span className="toggle-line" onClick={props.onClick}>
            <span className="toggle-circle left"></span>
          </span>
        );
      }

    
 
export default ToggleButton;