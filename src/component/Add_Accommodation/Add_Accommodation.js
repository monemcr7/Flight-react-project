import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import $ from 'jquery';
import "chosen-js/chosen.css";
import "chosen-js/chosen.jquery.js";
import DatePicker from "react-datepicker";
import moment from "moment";
import '../Add_Accommodation/Add-Accommodation.css'
import "react-datepicker/dist/react-datepicker.css";
import axios from '../../axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();


class addAccommodation extends Component {

    constructor(props) {
        super(props);
        this.state = {
        startDate:'',
        endDate: '',
        note : '',
        showOption: false,
        value : 'Purpose',
        objectiveValue: 'Objective',
        projectName: '',
        jobCode: '',
        roomNum : '',
        country: [],
        selectedOption: null,
        selectedRegionOption: null,
        travellingCompanion: null,
        region: [],
        myEmployees: [],
        Objective : [],
        Purposes : []
        };
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }



    

    componentDidMount() {
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
            console.log( response.data)
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

                $("input[name=rooms_no]").keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A, Command+A
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
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
        value: event.target.value
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

    objectiveOptionHandler = (event) => {
        event.preventDefault();
        this.setState({
        showOption : true,
        objectiveValue: event.target.value
        }) 
        console.log(this.state.objectiveValue)
        
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

    addAccommodationHandler = (approve) => {
        console.log(approve)

        const { history } = this.props;
        $(".invalid").removeClass("invalid");
        $('.error-validate').remove();
        var  y, i, valid = true,msg = '';
        y = document.getElementsByTagName("input");
        if($("#purposeSelect").val() == null){
            valid = false;
            $("#purposeSelect").parents('.form-group').append(`<span class="error-validate">The Purpose field is required.</span>`);
            $("#purposeSelect").addClass('invalid');

        }else if($("#objectiveSelect").val() == null && $('#purposeSelect').val() ==1){
            valid = false;
            $("#objectiveSelect").parents('.form-group').append(`<span class="error-validate">The Objective field is required.</span>`);
            $("#objectiveSelect").addClass('invalid');
        }else if($(".selectCountryFrom").val() == null){
            valid = false;
            $(".selectCountryFrom").parents('.form-group').append(`<span class="error-validate">The Country field is required.</span>`);
            $('.selectCountryFrom').parents('.form-group').find(".chosen-container-single").addClass('invalid');
        }
        else if($("input[name='rooms_no']").val() !="" && $("input[name='rooms_no']").val() == 0){
            valid = false;
            $("input[name='rooms_no']").parents('.form-group').append(`<span class="error-validate">The Number of Rooms field is required.</span>`);
            $("input[name='rooms_no']").addClass('invalid');

        }
        for (i = 0; i < y.length; i++) {
            if (y[i].value == "" && y[i].name != "" && !y[i].disabled) {
                y[i].className += " invalid";
                $(y[i]).parents('.form-group').append(`<span class="error-validate">The ${y[i].placeholder} field is required.</span>`);
                valid = false;
            }
        }
        if(valid){
            if(approve==1){
                // $('#ApproveSendAccommodation').modal('show');
            }else{

                $('.loading-overlay').removeClass('overlay-hidden');
                var form = new FormData($("#addAccommodation")[0]);
                // var method = '/accommodation';
                form.append("view_type","addtemplate");
                form.append("approve",approve);
                $.ajax({
                    type: "POST",
                    headers: { 'Authorization': localStorage.getItem('token')},
                    url: 'https://flights.caduceuslane-digital.com/api/addAccommodation',
                    data: form,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        // var obj =  $.parseJSON(data);
                        console.log(res);
                        if(res.success){
                            history.push("/My_requests");
                            $('.loading-overlay').addClass('overlay-hidden');
                        }
                    },
                    error: function(res){
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

    
    render() {
        const { selectedOption, selectedRegionOption ,travellingCompanion } = this.state;

        let countryOption = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        let cityOption = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        let EmployeesOption = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        let PurposesOption = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        let ObjectiveOption = <p style={{textAlign: 'center'}}>Something went wrong!</p>;

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
        


        const { startDate, endDate } = this.state;
        let nights_no = this.calculateDaysLeft(startDate, endDate);
        let night = null ;
        if (nights_no >=  0) {
            night = (
                <div className="form-group col-lg-4 col-md-4 col-12">
                <div className="num-night">
                    <label >Number of Nights</label>
                    <p><span name="nights_no" id="nights_no">{nights_no}</span> Nights</p>
                </div>
            </div>
            );
        }

        return (
            <Aux>      
                <div className="header-title">
                    <h1 className="page-title">Add New Accommodation</h1>
                </div>
                <form id="addAccommodation" action="" className="wrapper-form">
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
                        {
                            this.state.value === '1' ?
                            <Aux>
                                <div className="form-group col-lg-6 col-md-5 col-12">
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
                                <div className="form-group col-lg-6 col-md-5 col-12">
                                    <label >Project Name<span className="star-im">*</span></label>
                                    <input type="text" className="form-control"
                                    id="proName" name="project_name"
                                    placeholder="Project Name" 
                                    value={this.state.projectName} onChange={(event) => this.setState({projectName: event.target.value})}/>
                                </div>
                                <div className="form-group col-lg-6 col-md-5 col-12">
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
                    <div className="form-row">
                            <div className="form-group col-lg-4 col-md-5 select_country col-12">
                                <label>Country<span className="star-im">*</span></label>
                                <Select 
                                name="country_id"
                                onChange={this.handleChangeCountry}
                                options={countryOption} 
                                value={selectedOption}
                                placeholder="Country"
                                className="selectCountryFrom"
                                
                                />
                            </div>
                            <div className="form-group col-lg-4 col-md-5 select_country col-12">
                                <label >City<span className="star-im">*</span></label>
                                <Select
                                name="city_id"
                                onChange={this.handleChangeCity}
                                options={cityOption} 
                                value={selectedRegionOption}
                                placeholder="City"
                                />
                            </div>
                            </div>
                    <div className="form-row">
                        <div className="form-group col-lg-4 col-md-4 col-12">
                            <label >Check-in Date<span className="star-im">*</span></label>
                            <DatePicker
                                selected={this.state.startDate}
                                name="checkin_date"
                                onChange={this.handleChangeStart}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                placeholderText="Checkin-in Date"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode= "scroll"
                            />
                        </div>
                        <div className="form-group col-lg-4 col-md-4 col-12">
                            <label >Check-out Date<span className="star-im">*</span></label>
                            <DatePicker
                                    placeholderText="Check-out Date"
                                    name="checkout_date"
                                    selected={this.state.endDate}
                                    onChange={this.handleChangeEnd}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    
                                />
                        </div>
                        {night}
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
                            <label >Number of Rooms<span className="star-im">*</span></label>
                            <input type="text"
                            className="form-control"
                            name="rooms_no"
                            placeholder="Number of Rooms" 
                            value={this.state.roomNum} onChange={(event) => this.setState({roomNum: event.target.value})}/>
                        </div>
                    </div>
                        <div className="form-row">
                        <div className="form-group col-lg-8 col-md-10 col-12">
                            <label>Add Note<span className="star-im">*</span></label>
                            <textarea className="form-control"
                            name="notes"
                            id="addComment"
                            placeholder="Write your comment here"
                            value={this.state.note} onChange={(event) => this.setState({note: event.target.value})}></textarea>
                        </div>
                    </div>
                        <div className="form-row form-action">
                        <div className="col-lg-8 col-md-10 col-12 text-right">
                            <button onClick={() => this.addAccommodationHandler(-1)} type="button" className="btn btn-light save">Save To Drafts</button>
                            <button onClick={() => this.addAccommodationHandler(0)} type="button" className="btn btn-info backBtn">Send</button>
                        </div>
                    </div>
                </form>
        </Aux> 
        );
    }
}


export default addAccommodation;