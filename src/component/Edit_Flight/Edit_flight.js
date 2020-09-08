import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import $ from 'jquery';
import "chosen-js/chosen.css";
import "chosen-js/chosen.jquery.js";
import DatePicker from "react-datepicker";
import moment from "moment";
import '../Add_Flight/add_Flight.css';
import "react-datepicker/dist/react-datepicker.css";
import axios from '../../axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Destination from '../Destination/Destination'

const animatedComponents = makeAnimated();


class addFlight extends Component {

    constructor(props) {
        super(props);
        this.state = {
        startDate:'',
        endDate: '',
        note : '',
        showOption: false,
        value : 'Purpose',
        objectiveValue: 'Objective',
        faresValue: 'Trip Type',
        projectName: '',
        jobCode: '',
        roomNum : '',
        country: [],
        selectedOption: null,
        selectedRegionOption: null,
        travellingCompanion: null,
        selectedOptionTo: null,
        selectedRegionOptionTo: null,
        region: [],
        myEmployees: [],
        Objective : [],
        Purposes : [],
        Fares: [],
        destinationArray: [],
        flightData : this.props.location.state && this.props.location.state.referrer
        };
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }





    componentDidMount() {
        const data = {
            purpose_id : this.state.flightData.flight_data.purpose_id
        }
        axios
        .post('/getObjectives', data)
        .then((response) => {
            this.setState({
                Objective: response.data.objectives
            });
            console.log(response.data)
        })
        .catch((error) => console.log(error.response));
        console.log(this.props.location.state && this.props.location.state.referrer);
        this.setState({value: this.state.flightData.flight_data.purpose_id});
        this.setState({faresValue: this.state.flightData.flight_data.fare_id});
        this.setState({objectiveValue: this.state.flightData.flight_data.objective_id});
        this.setState({projectName: this.state.flightData.flight_data.project_name})
        this.setState({jobCode: this.state.flightData.flight_data.job_code})

        this.setState({
            selectedOption: [...this.state.flightData.flight_data_countries]
        });

        
        console.log(this.state.value)
        $(".error-validate").hide();
        axios
            .get('/getCountries')
            .then((response) => {
                this.setState({
                    country: response.data.countries
                });
            })
            .catch((error) => console.log(error.response));


        axios
        .get('/myEmployees')
        .then((response) => {
            this.setState({
                myEmployees: response.data.result,
            });
            // console.log( response.data.result[0])
        })
        .catch((error) => console.log(error.response));

        axios
        .get('/getPurposes')
        .then((response) => {
            this.setState({
                Purposes: response.data.purposes
            });
        })
        .catch((error) => console.log(error.response));

        axios
        .get('/getFares')
        .then((response) => {
            this.setState({
                Fares: response.data.fares
            });
            console.log(response.data.fares)
        })
        .catch((error) => console.log(error.response));


    }
    
    


    handleChangeCountry = (selectedOption) => {
        this.setState({ selectedOption });
        const data = {
            country_id : selectedOption.value
        }
        console.log(data)
        axios.post('/getCities', data)
        .then(response => {
            this.setState({
                region: response.data.cities,
                selectedRegionOption : ''
                
            });
            console.log(this.state.region);
        });
        // console.log(`Option selected:`, selectedOption);
    }

    handleChangeCity = (selectedRegionOption) => {
        this.setState({ selectedRegionOption });
        // console.log(`Option selected:`, selectedRegionOption);
    }

    travellingCompanionHandler = (travellingCompanion) => {
        this.setState({travellingCompanion});
    }

    handleOptionChange = (event) => {
        event.preventDefault();
        this.setState({
        showOption : true,
        value: event.target.value,
        }) 
        console.log(this.state.value)
        if (this.state.value === '1') {
            console.log('test')
        }

        const data = {
            purpose_id : event.target.value
        }
        axios
        .post('/getObjectives', data)
        .then((response) => {
            this.setState({
                Objective: response.data.objectives
            });
            console.log(response.data)
        })
        .catch((error) => console.log(error.response));
    }

    faresValueHandler = (event) => {
        event.preventDefault();
        this.setState({
        showOption : true,
        faresValue: event.target.value,
        }) 
    }

    objectiveOptionHandler = (event) => {
        event.preventDefault();
        this.setState({
        showOption : true,
        objectiveValue: event.target.value
        }) 
        
    }

    handleChangeStart(date) {
    this.setState({
        startDate: date
    });
    console.log(this.state.date)
    }

    handleChangeEnd(date) {
    this.setState({
        endDate: date
    });
    }
    
    calculateDaysLeft(startDate, endDate) {
        if (!moment.isMoment(startDate)) startDate = moment(startDate);
        if (!moment.isMoment(endDate)) endDate = moment(endDate);
    
        return endDate.diff(startDate, "days");
    }


    updateContent = () => {
        this.setState({
            destinationArray: [...this.state.destinationArray, <Destination/>],
        });
        console.log(this.state.destinationArray)
    }

    calculateDaysLeft(startDate, endDate) {
        if (!moment.isMoment(startDate)) startDate = moment(startDate);
        if (!moment.isMoment(endDate)) endDate = moment(endDate);
    
        return endDate.diff(startDate, "days");
    }

    addFlightHandler = (approve) => {
        console.log(approve)
        const { history } = this.props;
        $(".invalid").removeClass("invalid");
        $('.error-validate').remove();
        var  y, valid = true;
        y = document.getElementsByTagName("input");
        if($("#purposeSelect").val() == null && valid){
            valid = false;
            $("#purposeSelect").parents('.form-group').append(`<span class="error-validate">The Purpose field is required.</span>`);
            $("#purposeSelect").addClass('invalid');
        }
        if($('#fareSelect').val() == null && valid){
            valid = false;
            $("#fareSelect").parents('.form-group').append(`<span class="error-validate">The Trip Type field is required.</span>`);
            $("#fareSelect").addClass('invalid');
        }
        if($("#objectiveSelect").val() == null && $('#purposeSelect').val() == 1  && valid){
            valid = false;
            $("#objectiveSelect").parents('.form-group').append(`<span class="error-validate">The Objective field is required.</span>`);
            $("#objectiveSelect").addClass('invalid');
        }
        if($('#proName').val()==""  && valid){
            $('#proName').addClass("invalid");
            $("#proName").parents('.form-group').append(`<span class="error-validate">The Project Name field is required.</span>`);
            valid = false;
        }
        if($('#jobCode').val()==""  && valid){
            $('#jobCode ').addClass("invalid");
            $("#jobCode").parents('.form-group').append(`<span class="error-validate">The Job Code field is required.</span>`);
            valid = false;
        }
        // if($(".selectCountryFrom").val() == null){
        //     valid = false;
        //     $(".selectCountryFrom").parents('.form-group').append(`<span class="error-validate">The Country field is required.</span>`);
        //     $('.selectCountryFrom').parents('.form-group').find(".chosen-container-single").addClass('invalid');
        // }
        

        if(valid) {
            if($('#fareSelect').val() == 3){
                $('.selectCountry').each(function() {
                    if($(this).val() == null && valid){
                        valid = false;
                        $(this).parents('.form-group').append(`<span class="error-validate">The Field is required.</span>`);
                        $(this).parents('.form-group').find('.chosen-container-single').addClass('invalid');
                    }
                });
                $('.react-datepicker-wrapper input').each(function() {
                    if($(this).val()=="" && valid){
                        valid = false;
                        $(this).parents('.form-group').append(`<span class="error-validate">The Departure Date field is required.</span>`);
                        $(this).addClass('invalid');
                    }
                });
                if($('.react-datepicker-wrapper input').length <=1 && valid) {
                    valid = false;
                    $(".error-messages p").text('You must Add more than one Destination');
                    $(".error-messages").show();
                    $(".error-messages").animate({top: '0'}, 500);
                }
            }else{
                $('.selectCountry').each(function() {
                    if($(this).val() == null && valid){
                        valid = false;
                        $(this).parents('.form-group').append(`<span class="error-validate">The field is required.</span>`);
                        $(this).parents('.form-group').find('.chosen-container-single').addClass('invalid');
                    }
                });
                if($('.react-datepicker-wrapper input').val()=="" && valid){
                    valid = false;
                    $(".departure_date").parents('.form-group').append(`<span class="error-validate">The Departure Date field is required.</span>`);
                    $(".departure_date").addClass('invalid');
                }else if($('.return_date').val()=="" && $('#fareSelect').val()==2 && valid){
                    valid = false;
                    $(".return_date").parents('.form-group').append(`<span class="error-validate">The Return Date field is required.</span>`);
                    $(".return_date").addClass('invalid');
                }else if($('.return_date').val()!="" && $('#fareSelect').val()==2 && valid){
                    var diff =  $('.return_date').val() - $('.departure_date').val() / (1000 * 3600 * 24) ;
                    $(".invalid").removeClass("invalid");
                    $('.error-validate').remove();

                    if(!isNaN(diff)) {
                        if(diff < 0){
                            valid = false;
                            $(".return_date").parents('.form-group').append(`<span class="error-validate">The Return Date must be after departure date.</span>`);
                            $(".return_date").addClass('invalid');
                        }
                    }

                }
            }
        }
        
        if(valid){
            if(approve == 1){
                // $('#ApproveSendAccommodation').modal('show');
            } else {
                $('.loading-overlay').removeClass('overlay-hidden');
                var form = new FormData($("#addFlight")[0]);
                form.append("view_type","addtemplate");
                form.append("approve",approve);
                $.ajax({
                    type: "POST",
                    headers: { 'Authorization': localStorage.getItem('token')},
                    url: 'https://flights.caduceuslane-digital.com/api/addFlight',
                    data: form,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        // var obj =  $.parseJSON(data);
                        
                        if(res.success){
                            history.push("/My_requests");
                            $('.loading-overlay').addClass('overlay-hidden');
                            console.log("addAcommodation" + res);
                        }
                    },
                    error: function(res){
                        console.log("false" + res);
                        if( res.status === 422 ) {
                            $('.loading-overlay').addClass('overlay-hidden');
                            $('#errorValidation ul').html(``);
                            $.each( res.responseJSON.errors, function( key, value ) {
                                $('#errorValidation ul').append(`<li>${value}</li>`);
                            });
                            // $('#errorValidation').modal('show');
                        }
                    }
                });
            }
            
        }
    }

    handleChangeCountryTo = (selectedOptionTo) => {
        this.setState({ selectedOptionTo });
        const data = {
            country_id : selectedOptionTo.value
        }
        console.log(data)
        axios.post('/getCities', data)
        .then(response => {
            this.setState({
                region: response.data.cities,
                selectedRegionOptionTo : ''
                
            });
            console.log(this.state.region);
        });
        // console.log(`Option selected:`, selectedOption);
    }

    handleChangeCityTo = (selectedRegionOptionTo) => {
        this.setState({ selectedRegionOptionTo });
    }
    


    render() {
        const { selectedOption, selectedRegionOption, selectedOptionTo, selectedRegionOptionTo ,travellingCompanion } = this.state;

        let countryOption = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        let cityOption = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        let EmployeesOption = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        let PurposesOption = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        let ObjectiveOption = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        let fareOption = <p style={{textAlign: 'center'}}>Something went wrong!</p>;

        let countryOptionTo = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        let cityOptionTo = <p style={{textAlign: 'center'}}>Something went wrong!</p>;

        if (!this.state.error) {
            
            countryOption = this.state.country.map(row => {
                return { key: row.country_id , value: row.country_id, label: row.country_name};
            });
        }

        if (!this.state.error) {
            
            cityOption = this.state.region.map(row => {
                return {key: row.city_id , value: row.city_id, label: row.city_name};
            });
        }

        if (!this.state.error) {
            
            EmployeesOption = this.state.myEmployees.map(row => {
                return { key: row.user_id, value: row.user_id, label: row.employee_name};
            });
        }

        if (!this.state.error) {
            
            PurposesOption = this.state.Purposes.map(row => {
            return <option key={row.purpose_id} value={row.purpose_id}>{row.purpose_name}</option>;
            });
        }

        if (!this.state.error) {
            
            ObjectiveOption = this.state.Objective.map(row => {
            return <option key={row.objective_id} value={row.objective_id}>{row.objective_name}</option>;
            });
        }

        if (!this.state.error) {
            fareOption = this.state.Fares.map(row => {
            return <option key={row.fare_id} value={row.fare_id}>{row.fare_name}</option>;
            });
        }

        if (!this.state.error) {
            
            countryOptionTo = this.state.country.map(row => {
                return { key: row.country_id , value: row.country_id, label: row.country_name};
            });
        }

        if (!this.state.error) {
            
            cityOptionTo = this.state.region.map(row => {
                return {key: row.city_id , value: row.city_id, label: row.city_name};
            });
        }

        
        


        const { startDate, endDate } = this.state;
        let rowForm =  <Aux>
            <div className="form-group col-lg-3 col-md-6 select_country col-12">
                <label>From<span className="star-im">*</span></label>
                {/* <!-- Start First Country Select --> */}
                <div className="fr-country">
                    <Select 
                    name="country_from_id[]"
                    onChange={this.handleChangeCountry}
                    options={countryOption} 
                    // value={this.state.flightData.flight_data_countries[0].country_from}
                    placeholder="Country"
                    className="selectCountryFrom"
                    />
                </div>
            </div>
            <div className="form-group col-lg-3 col-md-6 select_country col-12">
                <label><span className="star-im">*</span></label>
                {/* <!-- Start First City Select --> */}
                <div className="fr-city[]">
                    <Select
                    name="city_from_id"
                    onChange={this.handleChangeCity}
                    options={cityOption} 
                    value={selectedRegionOption}
                    placeholder="City"
                    className=""
                    />
                </div>
            </div>
            <div className="form-group col-lg-3 col-md-6 select_country col-12">
                <label>To<span className="star-im">*</span></label>
                {/* <!-- Start Second Country Select --> */}
                <div className="sc-country">
                    <Select 
                    name="country_to_id[]"
                    onChange={this.handleChangeCountryTo}
                    options={countryOptionTo} 
                    value={selectedOptionTo}
                    placeholder="Country"
                    className="selectCountryFrom"
                    />
                </div>
            </div>
            <div className="form-group col-lg-3 col-md-6 select_country col-12">
                <label><span className="star-im">*</span></label>
                {/* <!-- Start Second City Select --> */}
                <div className="sc-city">
                <Select
                    name="city_to_id[]"
                    onChange={this.handleChangeCityTo}
                    options={cityOptionTo} 
                    value={selectedRegionOptionTo}
                    placeholder="City"
                    className=""
                    />
                </div>
            </div>
            <div className="form-group col-lg-3 col-md-6 col-12">
            <label >Departure Date<span className="star-im">*</span></label>
            <DatePicker
                selected={this.state.startDate}
                name="departure_date[]"
                onChange={this.handleChangeStart}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Departure Date"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode= "scroll"
                className="departure_date"
            />
        </div>
        </Aux>
        
        return (
            <Aux>      
                <div className="header-title">
                    <h1 className="page-title">Add New Flight</h1>
                </div>
                <form id="addFlight" action="" className="wrapper-form">
                    <div className="form-row row-width">
                        <div className="form-group col-lg-6 col-md-5 col-12">
                            <label >Purpose<span className="star-im">*</span></label>
                            <select className="form-control" id="purposeSelect" name="purpose_id" placeholder="Purpose" 
                            onChange={this.handleOptionChange} value={this.state.value}>
                                <option defaultValue="Purpose" disabled selected>Purpose</option>
                                {PurposesOption}
                            </select>
                            <i className="fa fa-chevron-down" aria-hidden="true"></i>
                        </div>
                        <div className="form-group col-lg-6 col-md-5 col-12">
                            <label>
                                Trip Type<span className="star-im">*</span>
                            </label>
                            <select className="form-control" id="fareSelect" placeholder="" name="fare_id"
                            onChange={this.faresValueHandler} value={this.state.faresValue}>
                                <option defaultValue="Trip Type" disabled selected>Trip Type</option>
                                {fareOption}
                            </select>
                            <i className="fa fa-chevron-down" aria-hidden="true"></i>
                        </div>
                        {
                            this.state.value == '1' ?
                            <Aux>
                                <div className="form-group col-lg-4 col-md-6 col-12">
                                    <label>Objective<span className="star-im">*</span></label>
                                    <select className="form-control"
                                    id="objectiveSelect"
                                    placeholder="Objective"
                                    name="objective_id"
                                    onChange={this.objectiveOptionHandler} value={this.state.objectiveValue}>
                                        <option defaultValue="Objective" disabled selected>Objective</option>
                                        {ObjectiveOption}
                                    </select>
                                </div>
                                <div className="form-group col-lg-4 col-md-6 col-12">
                                    <label >Project Name<span className="star-im">*</span></label>
                                    <input type="text" className="form-control"
                                    id="proName" name="project_name"
                                    placeholder="Project Name" 
                                    value={this.state.projectName} onChange={(event) => this.setState({projectName: event.target.value})}/>
                                </div>
                                <div className="form-group col-lg-4 col-md-6 col-12">
                                    <label>Job Code<span className="star-im">*</span></label>
                                    <input type="text"
                                    className="form-control"
                                    id="jobCode"
                                    name="job_code" placeholder="Job Code" 
                                    value={this.state.jobCode} onChange={(event) => this.setState({jobCode: event.target.value})}/>
                                </div>
                            </Aux>
                            : null
                            }
                    </div>
                    <div className="Destination">
                    <div className=""><hr/></div>
                    {
                            this.state.faresValue == '1' ?
                            <Aux>
                                <div className="form-row row-select-country">
                                {rowForm}
                                </div>
                            </Aux>
                            : this.state.faresValue == '2' ? 
                            <Aux>
                                <div className="form-row row-select-country">
                                    {rowForm}
                                    <div className="form-group col-lg-3 col-md-6 col-12">
                                        <label >Return Date<span className="star-im">*</span></label>
                                        <DatePicker
                                                placeholderText="Return Date"
                                                name="return_date"
                                                selected={this.state.endDate}
                                                onChange={this.handleChangeEnd}
                                                selectsEnd
                                                startDate={startDate}
                                                endDate={endDate}
                                                minDate={startDate}
                                                className="return_date"
                                                
                                            />
                                    </div>
                                </div>
                            </Aux> 
                            : this.state.faresValue == '3' ? 
                            <Aux>
                                <div id="multiDestination">
                                <Destination/>
                                { this.state.destinationArray.map((v, i) => 
                                    <Destination key={i}  removePlayer={this.removePlayer} />
                                )}
                                </div>
                                <div className="form-row addDestRow">
                                        <div className="col-lg-6 col-12"></div>
                                        <div className="action-row col-lg-6 col-md-12 col-12 ">
                                            <button onClick={this.updateContent} className="btn btn-info" type="button">Add Destination</button>
                                        </div>
                                        <div className="col-12"><hr/></div>
                                    </div>
                            </Aux>
                            : null
                        }
                    </div>
                    <div className="form-row">
                        <div className="form-group col-lg-8 col-md-10 col-sm-12 col-12">
                            <label >Travelling Companion</label>
                            <Select
                                isMulti
                                name="employees[]"
                                options={EmployeesOption }
                                onChange={this.travellingCompanionHandler}
                                value={travellingCompanion}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                components={animatedComponents}
                                placeholder="Travelling Companion"
                                
                            />
                        </div>
                    </div>
                        <div className="form-row">
                        <div className="form-group col-lg-8 col-md-10 col-12">
                            <label>Add Note</label>
                            <textarea className="form-control"
                            name="notes"
                            id="addComment"
                            placeholder="Write your comment here"
                            value={this.state.note} onChange={(event) => this.setState({note: event.target.value})}></textarea>
                        </div>
                    </div>
                        <div className="form-row form-action">
                        <div className="col-lg-8 col-md-10 col-12 text-right">
                            <button onClick={() => this.addFlightHandler(-1)} type="button" className="btn btn-light save">Save To Drafts</button>
                            <button onClick={() => this.addFlightHandler(0)} type="button" className="btn btn-info backBtn">Send</button>
                        </div>
                    </div>
                        
                </form>
        </Aux> 
        );
    }
}


export default addFlight;