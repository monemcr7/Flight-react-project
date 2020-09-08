import React ,{ Component }  from 'react';
import Aux from '../../hoc/Aux';
import $ from 'jquery'; 
import axios from '../../axios';
import { Redirect, Route, Switch,  Link  } from 'react-router-dom';



class AccommodationRequest_cards extends Component {
    state = {
        error : false,
        ViewDataResults: [],
        isRedirect: false
    }
    viewRequestHandler = () => {
        const data =  {
            acc_id :this.props.acc_id
        }
            axios.post('/viewAccommodation', data)
            .then(response => {
                this.setState({ViewDataResults : response.data.result, isRedirect: true})
                if (response.status === 200) {
                    console.log("REDIRECTION avec status => ", response.status);
                    $('.loading-overlay').addClass('overlay-hidden');
                }
                console.log(response)
            })
            .catch( error => {
            this.setState( { error: true } );
        } );
        }
    render () {
        const { isRedirect, ViewDataResults} = this.state
        if (isRedirect) {
            // redirect to home if signed up
            return <Redirect to = {{ pathname: "/view_Accommodation" ,  state: { referrer: this.state.ViewDataResults }}} />;
        }
    
        let button = null;
        
        if (this.props.approve == -1) {
            button = (
                <div className="card-btn row">
                    <div className="col-sm-6 padL">
                        <button onClick={this.viewRequestHandler} className="btn btn-info">VIEW</button>
                    </div>
                    <div className="col-sm-6 padR">
                        <button onClick={this.viewRequestHandler} className="btn btn-info send">Send</button>
                    </div>
                </div>
            );
        } else {
            button = (
                <div className="card-btn row">
                    <div className="col-sm-12 padding0">
                        <button  onClick={this.viewRequestHandler} className="btn btn-info">VIEW</button>
                    </div>
                </div>
            );  
        }

        let statusColor = '';
        if(this.props.approve == -1) {
            statusColor = 'status-saved'
        } else if (this.props.approve == -2) {
            statusColor = 'status-rejected'
        } else if (this.props.approve == 6) {
            statusColor = 'status-archived'
        } else {
            statusColor = 'status-approved'
        }
        
        return (
            <Aux>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className=" request-card shadow-sm  bg-white rounded">
                            <div className="cards-header">
                                <h2>
                                    {this.props.purpose_name}
                                    <span className={"status " + statusColor}>{this.props.approve_name}</span>
                                </h2>
                                <span id="Date" className="date-card">{this.props.checkin_date}</span>
                            </div>

                            <div className="card-info">
                                <span className="card-from">
                                    <span className="from">Country</span>{this.props.country_name}                                
                                </span>
                                
                                <span className="card-from">
                                    <span className="from">City</span>
                                    {this.props.city_name}                                
                                </span>
                            </div>
                            {button}
                        </div>
                    </div>
            </Aux> 
        );
    }
}
    


export default AccommodationRequest_cards;