import React, { Component } from 'react';
import { Redirect, Route, Switch,  Link  } from 'react-router-dom';
import axios from '../../axios';
import $ from 'jquery';
import Aux from '../../hoc/Aux';
import '../View_Request/View_Request.css';
import Comments from '../View_comment/View_commnet';
import Respons from '../View_respond/View_respond';
import ResponsTravel from '../View_respond_travel/View_respond_travel';
import View_employees from '../View_employees/View_employees';
import View_notes from '../View_notes/View_notes';
import Select from 'react-select';
import SuccessModal from '../successModal/successModal';
import DeleteModal from '../Delete_Modal/Delete_Modal';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();


class viewRequest extends Component {
    constructor(props) {
        super(props);
        this.handleModalShowClick = this.handleModalShowClick.bind(this);
        this.handleModalCloseClick = this.handleModalCloseClick.bind(this);
        this.handleModalShowClickDelete = this.handleModalShowClickDelete.bind(this);
        this.handleModalCloseClickDelete = this.handleModalCloseClickDelete.bind(this);
        
    }
    state = {
        data : this.props.location.state && this.props.location.state.referrer,
        manager_id : localStorage.getItem('manager_id'),
        travellingCompanion: null,
        hotelsOffer: [],
        showModal: false,
        isRedirect: false,
    }

    editHandler = () => {
        this.setState({isRedirect: true})
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

    handleModalShowClickDelete() {
        // e.preventDefault();
        this.setState({
            showModal: true
        })
    }
    handleModalCloseClickDelete() {
        this.setState({
            showModal: false
        })
    }

    componentDidMount() {
        
        console.log(this.props.location.state && this.props.location.state.referrer)
        console.log(this.state.data.flight_data.flight_id);

        axios({
            method: 'post',
            url: '/airlineOffers',
            data: {
                flight_id : this.state.data.flight_data.flight_id
            }
        }).then(function (response) {
            this.setState({
                hotelsOffer: response.data,
            });
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });



        

    }

    SendRequestHandler = () => {
        const { history } = this.props;
        
        const data =  {
            flight_id : this.state.data.flight_data.flight_id
        }
        axios.post('/sendFlightBooking', data)
        .then(response => {
            
            if (response.status === 200) {
            // this.handleModalShowClick()
            $("#success_tic").modal("show")
            setTimeout(function(){ $("#success_tic").modal("hide"); }, 2000);

            setTimeout(function(){ 
                $('.loading-overlay').removeClass('overlay-hidden');
                $('.loading-overlay').addClass('overlay-hidden');
                history.push("/My_requests");
            }, 3000);
            
            }
        })
        .catch( error => {
            this.setState( { error: true } );
        } );
    }

    removetHandler = () => {
        const { history } = this.props;
        
        const data =  {
            flight_id : this.state.data.flight_data.flight_id
        }
        axios.post('/deleteFlightBooking', data)
        .then(response => {
            
            if (response.status === 200) {
            this.handleModalShowClickDelete()
            setTimeout(function(){ 
                $('.loading-overlay').removeClass('overlay-hidden');
                $('.loading-overlay').addClass('overlay-hidden');
                history.push("/My_requests");
            }, 3000);
            
            }
        })
        .catch( error => {
            this.setState( { error: true } );
        } );
    }

    travellingCompanionHandler = (travellingCompanion) => {
        this.setState({travellingCompanion});
    }

    handlerCostForm = () => {
        if($(".costInput").val() == 0 || $(".costInput").val() == "" ){
            $(".costInput").className += " invalid";
            $('.loading-overlay').addClass('overlay-hidden');
            $(".error-messages p").text('Add a Valid Cost');
            $(".error-messages").show();
            $(".error-messages").animate({top: '0'}, 500);
            return;
        }
        $('.loading-overlay').removeClass('overlay-hidden');
        var form = new FormData($("#cost-form")[0]);
        form.append("view_type","addtemplate");
        $.ajax({
            type: "POST",
            headers: { 'Authorization': localStorage.getItem('token')},
            url: 'https://flights.caduceuslane-digital.com/api/addFlightCost',
            data: form,
            cache: false,
            contentType: false,
            processData: false,
            success: function (res) {
                if(res.success){
                    console.log(res)
                }
            },
            error: function(res){
                if( res.status === 422 ) {
                    console.log(res)
                }
            }
        });
}

    render() {
        const {travellingCompanion, showModal, isRedirect ,data} = this.state;

        let comment =null;
        let responsCommponent = null;
        let editBtn = null;
        let deleteBtn = null;
        let sendBtn = null;
        let unlockBtn = null;
        let chooseAirLine = null;

        if (isRedirect) {
            // redirect to Edit Add flight
            return <Redirect to = {{ pathname: "/Edit_Flight" ,  state: { referrer: this.state.data }}} />;
        }

        if (this.state.manager_id == localStorage.getItem('manager_id')) {
            
            if (Object.keys(this.state.data.comment).length === 0 && this.state.data.comment.constructor === Object) {
                console.log("comment is empty!");
            } else {
                comment = <Comments commedtData={this.state.data.comment}/>
            }

            
            if (this.state.data.flight_data.approve == 0 && this.state.data.flight_data_countries[0].departure_date >= new Date()) {
                responsCommponent = <Respons flightID={this.state.data.flight_data.flight_id}/>
            }

            
            if (this.state.data.flight_data.approve == -1 || this.state.data.flight_data.approve == -3 || this.state.data.flight_data.approve == -5 ) {
                editBtn =   (
                    <li className="edit">
                        <button onClick={this.editHandler} className="btn btn-light"><i className="fa fa-pencil" aria-hidden="true"></i></button>

                        <span>Edit</span>
                    </li>
                );
                console.log("true Edited")
            }

            
            if(this.state.data.flight_data.approve == -1 && Object.keys(this.state.data.comment).length === 0 && this.state.data.comment.constructor === Object) {
                deleteBtn = (
                    <Aux>
                        <li className="send">   
                        <button onClick={this.handleModalShowClickDelete} className="btn btn-light"><i className="fa fa-trash" aria-hidden="true"></i></button>
                        <span>Remove</span>
                    </li>
                    {showModal ? (<DeleteModal removetHandler={this.removetHandler} handleModalCloseClickDelete={this.handleModalCloseClickDelete} />) : null}
                    </Aux>
                )
                
                console.log("true Remove")
            }

            
            if(this.state.data.flight_data.approve == -1) {
                sendBtn = (
                    <li className="send">
                        <button onClick={this.SendRequestHandler} className="btn btn-light"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                        {showModal ? (<SuccessModal handleModalCloseClick={this.handleModalCloseClick} />) : null}
                        <span>Send</span>
                    </li>
                );
                console.log("true Send")
            }

            
            if(this.state.data.flight_data.approve == 1 && Object.keys(this.state.data.flight_data.is_unlocked ).length === 0 && this.state.data.flight_data.is_unlocked.constructor === Object) {
                unlockBtn = (
                    <li className="send">
                        <button className="btn btn-light"><i className="fa fa-lock" aria-hidden="true"></i></button>
                        <span>Unlock</span>
                    </li>
                )
                console.log("true Unlock")
            }

            if(this.state.data.flight_data.approve == -4 ) {
                chooseAirLine = <button className="btn btn-light airline suggest_airline">
                                    <img src={require("../../assets/img/airplane-blue.png")}  alt=""/> Choose Airline
                                </button>
            }

        }


        let responsTravel = null;
        let addAirline = null;
        let airlineOffersOption = null;
        let cost_form = null;

        airlineOffersOption = this.state.hotelsOffer.map(row => {
            return { key: row.airline_id, value: row.airline_id, label: row.airline_name};
        });

        if (localStorage.getItem('level_id') == 2  ) {
            if(this.state.data.flight_data.approve == 1 && this.state.data.flight_data.is_unlocked == 1) {
                responsTravel = <ResponsTravel/>
            }

            if(this.state.data.flight_data.approve == 1 && this.state.data.flight_data.is_unlocked == 0) {
                addAirline = (
                    <Aux>
                        <form id="suggestion-form" className="form-select" action="" method="POST" >
                            <h2 className="title-form">Add Airlines</h2>
                            <div className="form-row aireline">
                                <div className="form-group col-12">
                                    <label htmlFor="Airlines">Add Airlines<span className="star-im">*</span></label>
                                    <Select
                                        isMulti
                                        name="airline_id[]"
                                        options={airlineOffersOption}
                                        onChange={this.travellingCompanionHandler}
                                        value={travellingCompanion}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        components={animatedComponents}
                                        placeholder="Travelling Companion"
                                        
                                    />
                                </div>
                            </div>
                            <div className="form-row form-action">
                                <div className="col-12 text-right">
                                    <button type="button" className="btn btn-info backBtn" >SEND</button>
                                </div>
                            </div>
                        </form>
                    </Aux>
                )
            }

            if(this.state.data.flight_data.approve == 1 || this.state.data.flight_data.approve == 6) {
                cost_form = (
                    <Aux>
                        <form id="cost-form" className="form-select" action="" method="POST" >
                            <h2 className="title-form">Add Cost</h2>
                            <div className="form-row cost">
                                <div className="form-group col-md-6 col-12">
                                    <label htmlFor="Cost">Cost<span className="star-im">*</span></label>
                                    <input type="number" className="form-control costInput" placeholder="Add Cost" name="cost" />
                                </div>
                                <div className="form-group col-md-6 col-12">
                                    <label htmlFor="AdditionalCost">Additional Cost</label>
                                    <input type="number" className="form-control " placeholder="Additional Cost" name="additional_cost" />
                                </div>
                            </div>
                            <div className="form-row form-action">
                                <div className="col-12 text-right">
                                    <button type="button" className="btn btn-info backBtn" onClick={this.handlerCostForm} >SEND</button>
                                </div>
                            </div>
                        </form>
                    </Aux>
                )
            }
        }

        let employees =null;

        if (Object.keys(this.state.data.emp_name).length === 0 && this.state.data.emp_name.constructor === Object) {
            console.log("no employees")
        } else {
            employees = <View_employees emp_name={this.state.data.emp_name} /> 
        }

        let Notes = null;
        if (this.state.data.flight_data.note != '') {
            Notes = <View_notes noteText={this.state.data.flight_data.note} />
        }

        let Details = null;
        function formatDate(string){
            var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

            return new Date(string).toLocaleDateString([],options);
        }
        Details = this.state.data.flight_data_countries.map(row => {
            let departure_date= formatDate(row.departure_date);
            return (
                <ul className="list-unstyled" key={row.fare_id}>
                    <li className="left-part-list">
                        <span className="card-title circle-title">From</span>
                        <h2>{row.city_from}</h2>
                        <p className="country">{row.country_from}</p>
                        <span className="card-date">{departure_date}</span>
                    </li>

                    <li>
                    <img src={require("../../assets/img/line2.png")} alt="line2"/>
                    </li>

                    <li>
                        <span className="card-title">To</span>
                        <h2> {row.city_to}</h2>
                        <p className="country">{row.country_to}</p>
                    </li>
                </ul>
            )
        })

        let statusColor = '';
        if(this.state.data.flight_data.approve == -1) {
            statusColor = 'status-saved'
        } else if (this.state.data.flight_data.approve == -2) {
            statusColor = 'status-rejected'
        } else if (this.state.data.flight_data.approve == 6) {
            statusColor = 'status-archived'
        } else {
            statusColor = 'status-approved'
        }

        let purposeSec = null;

        if(this.state.data.flight_data.purpose_id == 1){
            purposeSec = (
                <div className="row req-text-type">
                    <ul>
                        <li>
                            <div className="small-text-type">Objective</div>
                            <div className="type-info">
                                {this.state.data.flight_data.trip_objective}
                            </div>
                        </li>
                        <li>
                            <div className="small-text-type">Project name</div>
                            <div className="type-info">
                                {this.state.data.flight_data.project_name}
                            </div>
                        </li>
                        <li>
                            <div className="small-text-type">Job code</div>
                            <div className="type-info">
                                {this.state.data.flight_data.job_code}
                            </div>
                        </li>
                    </ul>
                </div>
            );
        }

        let TicketSec = [] 
        if(this.state.data.tickets.length < 1 || this.state.data.tickets == undefined) {
            TicketSec = <li className="col-lx-2 col-lg-3 col-md-4 col-6 no-tickets"><span>No Tickets</span></li>
        } else {
            TicketSec = this.state.data.tickets.map(row => {
                return (
                    <li key={row.ticket_id} className="col-lx-2 col-lg-3 col-md-4 col-6">
                        <a href={"https://flights.caduceuslane-digital.com/public/uploads/"+ row.ticket_name } download={row.icon} target="_blank">
                            <div className="ticket-content">
                                    <span><i className="fa fa-file-image-o" aria-hidden="true"></i></span>
                                    <span className="ticket-name">Ticket Image</span>
                            </div>
                        </a>
                    </li>
                );
            })
        }

        let actionLogs = null;
        if(this.state.data.action_logs.length < 1 || this.state.data.action_logs == undefined) {
            actionLogs = <h2  className="sec-title">No Timeline</h2>
        } else {
            actionLogs = this.state.data.action_logs.map(row => {
                let created= formatDate(row.created_at);
                return (
                    <li key={row.log_id}>
                        <div className="timeline-content">
                            {row.notes}
                        </div>
                        <div className="data-timeline">{created}</div>
                    </li>
                );
            })
        }

        return(
            <Aux>      
            {/* <!-- Start Comment Section --> */}
                {/* <Comments/> */}
                {comment}
                {responsTravel}
                {responsCommponent}
                {addAirline}
                {cost_form}
                {/* <!-- Start Request Info --> */}
                <div className="row">
                    <div className="col-md-6">
                        <div className="left-side-req">
                            <div className="request-type-icon">
                                <img src={require("../../assets/img/flight.png")} alt="flight"/>
                            </div>
                            <div className="requestInfo ">
                                <span className="request-type">Flight</span>
                                <span className="requestName">{this.state.data.flight_data.purpose_name}</span>
                                <span className={"status " + statusColor}>{this.state.data.flight_data.approve_name}</span>
                                <span className="Destination-type">{this.state.data.flight_data.fare_type}</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 text-right">
                        <div className="right-side-req">
                            {chooseAirLine} 
                            <ul>
                                {sendBtn}
                                {editBtn}
                                {deleteBtn}
                                {unlockBtn}
                            </ul>
                        </div>
                    </div>
                </div>
                {purposeSec}
                {employees}
                {Notes}
                
                <div className="row requst-info">
                    <div className="col-lg-6 col-12 request-left">
                        <div className="details">
                            <h2>details</h2>
                            <div className="details-body">
                                <div className="overlay"></div>
                                {Details}
                            </div>
                        </div>

                        <div className="ticket-sec">
                            <h2>Tickets</h2>
                            <ul className="list-unstyled">
                                <div className="row">
                                {TicketSec}
                                </div>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-6 col-12 request-right">
                        <div className="timeline-section">
                            <h2>Timeline</h2>
                            <ul className="list-unstyled">
                                {actionLogs}
                            </ul>
                        </div>
                    </div>
                </div>
                
            </Aux>  
        );
    }
}    

export default viewRequest;