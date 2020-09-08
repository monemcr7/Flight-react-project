import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import $ from 'jquery';
import "chosen-js/chosen.css";
import "chosen-js/chosen.jquery.js";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import axios from '../../axios';
import Select from 'react-select';

class Destination extends Component {

    constructor(props) {
        super(props);
        this.state = {
        startDate:'',
        endDate: '',
        showOption: false,
        country: [],
        selectedOption: null,
        selectedRegionOption: null,
        selectedOptionTo: null,
        selectedRegionOptionTo: null,
        region: [],
        myEmployees: [],
        showImage:true
        };
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
    }

    componentDidMount() {
        axios
            .get('/getCountries')
            .then((response) => {
                this.setState({
                    country: response.data.countries
                });
            })
            .catch((error) => console.log(error.response));

            $('document').ready(function(){
                $(".action-del").on("click" ,function() {
                    $(this).parent(".parent").remove();
                    console.log("test")
                })
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


    handleChangeCity = (selectedRegionOption) => {
        this.setState({ selectedRegionOption });
    }

    handleChangeCityTo = (selectedRegionOptionTo) => {
        this.setState({ selectedRegionOptionTo });
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



    render() {
        const { selectedOption, selectedRegionOption, selectedOptionTo, selectedRegionOptionTo } = this.state;

        let countryOption = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        let cityOption = <p style={{textAlign: 'center'}}>Something went wrong!</p>;

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
        return (
            <Aux>
                <div className="">
                <div className="parent form-row row-select-country multi-select">
                <div className="form-group col-lg-3 col-md-6 select_country col-12">
                    <label>From<span className="star-im">*</span></label>
                    {/* <!-- Start First Country Select --> */}
                    <div className="fr-country">
                        <Select 
                        name="country_from_id[]"
                        onChange={this.handleChangeCountry}
                        options={countryOption} 
                        value={selectedOption}
                        placeholder="Country"
                        className="selectCountry selectCountryFrom"
                        />
                    </div>
                </div>
                <div className="form-group col-lg-3 col-md-6 select_country col-12">
                    <label><span className="star-im">*</span></label>
                    {/* <!-- Start First City Select --> */}
                    <div className="fr-city">
                        <Select
                        name="city_from_id[]"
                        onChange={this.handleChangeCity}
                        options={cityOption} 
                        value={selectedRegionOption}
                        placeholder="City"
                        className="selectCityFrom selectCityFrom"
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
                        className="selectCountry selectCountryFrom"
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
                        className="selectCityFrom selectCityTo"
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
            <div className="action-del">
                    <button type="button" className="btn btn-light" type="button"><i className="fa fa-trash" aria-hidden="true"></i></button>
                </div>
                </div>
            </div>
        </Aux>
        );
    }
}


export default Destination;