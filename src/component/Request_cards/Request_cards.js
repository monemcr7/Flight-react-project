import React ,{ Component }  from 'react';
import Aux from '../../hoc/Aux';
import $ from 'jquery'; 
// import viewRequest from '../View_Request/View_Request';
import SuccessModal from '../successModal/successModal';
import axios from '../../axios';
import { Redirect, Route, Switch,  Link  } from 'react-router-dom';

class request_card extends Component {
    constructor(props) {
        super(props);
        this.handleModalShowClick = this.handleModalShowClick.bind(this);
        this.handleModalCloseClick = this.handleModalCloseClick.bind(this);
        
    }
    state = {
        error : false,
        ViewDataResults: [],
        isRedirect: false,
        showModal: false,
        reload: false
    }

    handleModalShowClick() {
        // e.preventDefault();
        this.setState({
            showModal: true
        })
    }
    handleModalCloseClick() {
        this.setState({
            showModal: false
        })
    }

    viewRequestHandler = () => {
        $('.loading-overlay').removeClass('overlay-hidden');
        const data =  {
            flight_id :this.props.flight_id
        }
        axios.post('/viewFlight', data)
        .then(response => {
            this.setState({ViewDataResults : response.data.result, isRedirect: true})
            // this.setState({ isRedirect: true });
            
            if (response.status === 200) {
            console.log("REDIRECTION avec status => ", response.status);
            $('.loading-overlay').addClass('overlay-hidden');
            }
            
        })
        .catch( error => {
            this.setState( { error: true } );
        } );
            
    }

    
    SendRequestHandler = () => {
        const { history } = this.props;
        const data =  {
            flight_id :this.props.flight_id
        }
        axios.post('/sendFlightBooking', data)
        .then(response => {
            if (response.status === 200) {
            this.handleModalShowClick();
            setTimeout(function(){ $("#success_tic").modal("hide");
            history.push("/My_requests"); }, 2000);
            setTimeout(function(){ 
                $('.loading-overlay').removeClass('overlay-hidden');
                $('.loading-overlay').addClass('overlay-hidden');
            }, 3000);
            }
        })
        .catch( error => {
            this.setState( { error: true } );
        } );
    }

    
    render () {
        const { isRedirect, ViewDataResults, showModal} = this.state
        if (isRedirect) {
            // redirect to home if signed up
            return <Redirect to = {{ pathname: "/View_Request" ,  state: { referrer: this.state.ViewDataResults }}} />;
        }
        let button = null;
        
        if (this.props.approve == -1) {
            button = (
                <div className="card-btn row">
                    <div className="col-sm-6 padL">
                        <button onClick={this.viewRequestHandler} className="btn btn-info">VIEW</button>
                    </div>
                    <div className="col-sm-6 padR">
                        <button onClick={this.SendRequestHandler} className="btn btn-info send">Send</button>
                        {showModal ? (<SuccessModal handleModalCloseClick={this.handleModalCloseClick} />) : null}
                    </div>
                </div>
            );
        } else {
            button = (
                <div className="card-btn row">
                    <div className="col-sm-12 padding0">
                        <button onClick={this.viewRequestHandler} className="btn btn-info">VIEW</button>
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
                                <span className="requst-type-sec">{this.props.fare_type}</span>
                                <span id="Date" className="date-card">{this.props.checkin_date}</span>
                            </div>

                            <div className="card-info">
                                <span className="card-from">
                                    <span className="from">From</span>{this.props.city_from}                                
                                </span>
                                <span className="icon-trv">
                                    <img src={require("../../assets/img/plane (1).png")} alt="plane"/>
                                </span>
                                <span className="card-from">
                                    <span className="from">To</span>
                                    {this.props.city_to}                                
                                </span>
                            </div>
                            {button}
                        </div>
                    </div>
            </Aux> 
        );
    }
}
    


export default request_card;