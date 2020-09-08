import React ,{ Component }  from 'react';
import Aux from '../../hoc/Aux';
import $ from 'jquery'; 
import axios from '../../axios';



class AccommodationHistoryCards extends Component {
   
    viewRequestHandler = () => {
        const data =  {
            acc_id :this.state.acc_id
        }
            axios.post('/viewAccommodation', data)
            .then(response => {
                console.log(response)
            })
            .catch( error => {
            this.setState( { error: true } );
        } );
        }
    render () {
    

        let statusCards = null;
        let button = null;
        
        if (this.props.approve == -1) {
            button = (
                <div className="card-btn row">
                    <div className="col-sm-6 padL">
                        <button  onClick={this.viewRequestHandler} className="btn btn-info">VIEW</button>
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


        if (this.props.approve == 0) {
            statusCards = <span className="status status-approved">Sent to Manager</span>;
        } else if (this.props.approve == 1) {
            statusCards = <span className="status status-approved">Approved by Manager</span>;
        } else if (this.props.approve == -1) {
            statusCards = <span className="status status-saved">Draft</span>;
        } else if (this.props.approve == -2) {
            statusCards = <span className="status status-rejected">Rejected by Manager</span>;
        } else if (this.props.approve == -3) {
            statusCards = <span className="status status-approved">Pending with Comments</span>;
        } else if (this.props.approve == -4) {
            statusCards = <span className="status status-approved">Hotel options provided</span>;
        } else if (this.props.approve == -5) {
            statusCards = <span className="status status-approved">Approved with comments</span>;
        } else if (this.props.approve == -7) {
            statusCards = <span className="status status-approved">Accommodation option is chosen</span>;
        } else if (this.props.approve == 2) {
            statusCards = <span className="status status-approved">Cost sent to finance</span>;
        } else if (this.props.approve == 3) {
            statusCards = <span className="status status-approved">Cost Approved</span>;
        } else if (this.props.approve == 4) {
            statusCards = <span className="status status-approved">Completed</span>;
        } else if (this.props.approve == 6) {
            statusCards = <span className="status status-archived">Pending with comments</span>;
        }
        return (
            <Aux>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className=" request-card shadow-sm  bg-white rounded">
                            <div className="cards-header">
                                <h2>
                                    {this.props.purpose_name}
                                    {statusCards}
                                </h2>
                                <span className="requst-type-sec">{this.props.fare_name}</span>
                                <span id="Date" className="date-card">{this.props.date_time}</span>
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
    


export default AccommodationHistoryCards;