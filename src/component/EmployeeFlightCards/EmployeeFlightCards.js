import React ,{ Component }  from 'react';
import Aux from '../../hoc/Aux';
import $ from 'jquery'; 


class EmployeeFlightCards extends Component {
    
    render () {
        let button = null;
        
        if (this.props.approve == -1) {
            button = (
                <div className="card-btn row">
                    <div className="col-sm-6 padL">
                        <button className="btn btn-info">VIEW</button>
                    </div>
                    <div className="col-sm-6 padR">
                        <button className="btn btn-info send">Send</button>
                    </div>
                </div>
            );
        } else {
            button = (
                <div className="card-btn row">
                    <div className="col-sm-12 padding0">
                        <button className="btn btn-info">VIEW</button>
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
                                    <span className="user-name-icon"><i className="fa fa-user" aria-hidden="true"></i> {this.props.full_name}</span>
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
    


export default EmployeeFlightCards;