import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import $ from 'jquery'; 
import 'dropify/dist/js/dropify.js';
import axios from '../../axios';
// import ResidencyForm from '../Residency-form/Residency-form';

import 'dropify/dist/css/dropify.min.css';
class EditProfile extends Component {
    
    state = {
        userInfo: {},
        username : '',
        userImage : '',
        national: '',
        nationality_id : '',
        birth_date: '',
        phone_num : '',
        occupation : '',
        passport_expdate : '',
        passport_number : '',
        medical : '',
        passport_image : '',
        passport_issuedate : '',
        expire_date : '',
        resdiency_image : '',
        destination : [],
        resd_number : [],
        issue_date : [],
        resd_data : [],
        loading: false,
        error : false
    }

    EditProfileDataHandler = (event) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const config = {
            headers: { 'Authorization': localStorage.getItem('token')}
        };
        const data = {
            full_name : this.state.username,
            image_profile: this.state.userImage,
            national_id: this.state.national,
            nationality_id: this.state.nationality_id,
            birth_date: this.state.birth_date,
            mobile_no : this.state.phone_num,
            occupation : this.state.occupation,
            medical_status: this.state.medical,
            passport_expdate: this.state.passport_expdate,
            passport_number: this.state.passport_number,
            passport_image: this.state.passport_image,
            passport_issuedate: this.state.passport_issuedate,
            expire_date: this.state.expire_date,
            resdiency_image: this.state.resdiency_image,
            destination: this.state.destination,
            issue_date: this.state.issue_date,
            resd_number: this.state.resd_number
        };
        axios.post('https://flights.caduceuslane-digital.com/api/saveInfo', config, data)
            .then(response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
                console.log(response)
            })
            .catch( error => {
                this.setState( { loading: false } );
                console.log(error)
            } );
    }

    componentDidMount() {
        
        axios.get( 'https://flights.caduceuslane-digital.com/api/userInfo', {
            headers: { 'Authorization': localStorage.getItem('token')}
        }) .then( response => {
            this.setState( { userInfo: response.data } );
            console.log(this.state.userInfo)
            this.setState({username: this.state.userInfo.personal_passport.full_name});
            this.setState({userImage: this.state.userInfo.personal_passport.image_profile});
            this.setState({national: this.state.userInfo.personal_passport.nationality_name});
            this.setState({birth_date: this.state.userInfo.personal_passport.birth_date});
            this.setState({phone_num: this.state.userInfo.personal_passport.mobile_no});
            this.setState({medical: this.state.userInfo.personal_passport.medical_status});
            this.setState({nationality_id: this.state.userInfo.personal_passport.national_id});
            this.setState({passport_expdate: this.state.userInfo.personal_passport.passport_expdate});
            this.setState({passport_number: this.state.userInfo.personal_passport.passport_number});
            this.setState({passport_image: this.state.userInfo.personal_passport.passport_image});
            this.setState({passport_issuedate: this.state.userInfo.personal_passport.passport_issuedate});
            this.setState({occupation: this.state.userInfo.personal_passport.occupation});
            localStorage.setItem('passport_image', "https://flights.caduceuslane-digital.com/public/uploads/" +  this.state.userInfo.personal_passport.passport_image);
            const resd_data_row_form =  this.state.userInfo.resd_data.map(row => {
                return {
                    ...row
                }
            });
            this.setState({resd_data : resd_data_row_form});

        } )
        .catch( error => {
            this.setState( { error: true } );
        } );

        
        
        $(document).ready(function() {
            $('.dropify').dropify();
            $('#input-file-now').attr("data-default-file", localStorage.getItem('passport_image'));

            
            $('.btn').click(function(event) {
                event.preventDefault();
                var target = $(this).data('target');
                // console.log('#'+target);
                $('#click-alert').html('data-target= ' + target).fadeIn(50).delay(3000).fadeOut(1000);
    
            });
    
    
            // Multi-Step Form
            var currentTab = 0;
            showTab(currentTab);
    
            function showTab(n) {
                var x = document.getElementsByClassName("tab");
                x[n].style.display = "block";
                if (n == 0) {
                    document.getElementById("prevBtn").style.display = "none";
                    if (document.getElementById("nextBtn").innerHTML == "Next") {
                        $("#nextBtn").show();
                    }
                } else {
                    document.getElementById("prevBtn").style.display = "inline";
                    if (document.getElementById("nextBtn").innerHTML == "Next") {
                        $("#nextBtn").show();
                    }
                }
                if (n == (x.length - 1)) {
                    document.getElementById("nextBtn").innerHTML = "Submit";
                    if (document.getElementById("nextBtn").innerHTML == "Submit") {
                        $("#nextBtn").hide();
                    }
                    

                } else {
                    document.getElementById("nextBtn").innerHTML = "Next";
                    if (document.getElementById("nextBtn").innerHTML == "Next") {
                        $("#nextBtn").show();
                    }
                }
                fixStepIndicator(n)
            }
    
            function nextPrev(n) {
                var x = document.getElementsByClassName("tab");
                if (n == 1 && !validateForm()) return false;
                x[currentTab].style.display = "none";
                currentTab = currentTab + n;
                if (currentTab >= x.length) {
                    document.getElementById("infoForm").submit();
                    return false;
                }
                showTab(currentTab);
            }

            $("#prevBtn").click(function() {
                nextPrev(-1)
            });

            $("#nextBtn").click(function() {
                nextPrev(1)
            });
    
            function validateForm() {
                var x, y, i, valid = true;
                x = document.getElementsByClassName("tab");
                y = x[currentTab].getElementsByTagName("input");
                for (i = 0; i < y.length; i++) {
                    // If a field is empty...
                    if (y[i].value == "") {
                        y[i].className += " invalid";
                        // valid = false;
                    }
                }
                if (valid) {
                    document.getElementsByClassName("step")[currentTab].className += " finish";
                }
                return valid;
            }
    
            function fixStepIndicator(n) {
                var i, x = document.getElementsByClassName("step");
                for (i = 0; i < x.length; i++) {
                    x[i].className = x[i].className.replace(" active", "");
                }
                x[n].className += " active";
            }
            
            
        });
    }

    componentDidUpdate(prevProps, prevState) {
        $('.dropify').dropify();
    }

    render() { 
        function handleSubmit(event) {
            event.preventDefault();
        }

        let resRow = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            resRow = this.state.resd_data.map(row => {
                return (
                    <div key={row.resd_id}>
                        <div className="form-row last-tab">
                            <div className="form-group col-12">
                                <label htmlFor="residencytNumber">Residency Number</label>
                                <input type="text" className="form-control" id="residencytNumber" name="resd_number[]" defaultValue={row.resd_number_data}  placeholder="Residency Number" />
                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="issueDate">Issue Date</label>
                                <input type="text" className="form-control issueDate" id="issueDate1" name="issue_date[]" defaultValue={row.issue_date_data}  placeholder="Issue Date" />
                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="expiryDate">Expiry date</label>
                                <input type="text" className="form-control" id="expiryDate1" name="expire_date[]" defaultValue={row.expire_date_data}  placeholder="Expiry date" />
                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="destination">Destination</label>
                                <input type="text" className="form-control" id="destination" name="destination[]" defaultValue={row.destination_data}  placeholder="Destination" />
                            </div>
                            <div className="form-group col-12 resImg">
                            <label htmlFor="input-file-now-res">Residency Image</label>
                            <input type="file" id="input-file-now-res" className="dropify"
                                name="passport_image"
                                data-default-file=""
                                placeholder="Passport Image"/>
                            </div>
                            <div className="col-12 text-right add-visa">
                                <button type="button" className="btn-add">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                    <span>ADD VISA</span>
                                </button>
                            </div>
                        </div>
                    </div>
                );
                
                
            });
        }

        return ( 
            <Aux>
                <div className="">
                    <form id="infoForm" onSubmit={handleSubmit}>
                       {/* <!-- Circles which indicates the steps of the form: --> */}
                        <ul id="progressbar">
                            <li className="step active">
                                <p>
                                    Personal <br/><span>Information</span>
                                </p>
                            </li>
                            <li className="step">
                                <p>
                                    Passport  <br/><span>information</span>
                                </p>
                            </li>
                            <li className="step">
                                <p>
                                    Residency  <br/><span>information</span>
                                </p>
                            </li>
                        </ul>
                        <div className="tab">
                            <div className="form-row">
                                <div className="form-group col-12">
                                    <label htmlFor="namePassport">Name as in Passport</label>
                                    <input type="text" className="form-control" name="full_name" value={this.state.username} onChange={(event) => this.setState({username: event.target.value})}  id="namePassport" placeholder="Name as in Passport"/>
                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input type="text" className="form-control" name="mobile_no " value={this.state.phone_num} onChange={(event) => this.setState({phone_num: event.target.value})} id="phone" placeholder="Phone Number"/>
                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="profession">Profession</label>
                                    <input type="text" className="form-control" name="occupation" value={this.state.occupation} onChange={(event) => this.setState({occupation: event.target.value})}  id="profession" placeholder="Profession"/>
                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="nationality">Nationality</label>
                                    <input type="text" className="form-control" name="nationality_id" value={this.state.national} onChange={(event) => this.setState({national: event.target.value})}  id="nationality" placeholder="Nationality"/>
                                </div>
                                
                                <div className="form-group col-12">
                                    <label htmlFor="nationalId">National ID</label>
                                    <input type="text" className="form-control"  name="national_id" value={this.state.nationality_id} onChange={(event) => this.setState({nationality_id: event.target.value})} id="nationalId" placeholder="National ID"/>
                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="dateOfBirth">Birthdate</label>
                                    <input type="text" className="form-control" name="birth_date"  value={this.state.birth_date} onChange={(event) => this.setState({birth_date: event.target.value})} id="dateOfBirth" placeholder="Birthdate"/>
                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="medical">Medical Status</label>
                                    <input type="text" className="form-control" name="medical_status" id="medical" value={this.state.medical} onChange={(event) => this.setState({medical: event.target.value})} placeholder="Medical Status"/>
                                </div>
                            </div>
                        </div>
                        
                        <div className="tab">
                            <div className="form-row">
                                <div className="form-group col-12">
                                    <label htmlFor="passportNumber">Passport Number</label>
                                    <input type="text" className="form-control" name="passport_number" value={this.state.passport_number} onChange={(event) => this.setState({passport_number: event.target.value})} id="passportNumber" placeholder="Passport Number"/>
                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="issueDate">Issue Date</label>
                                    <input type="text" className="form-control issueDate" id="issueDate" value={this.state.passport_issuedate} onChange={(event) => this.setState({passport_issuedate: event.target.value})} name="passport_issuedate" placeholder="Issue Date"/>
                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="expiryDate">Expiry date</label>
                                    <input type="text" className="form-control" id="expiryDate" value={this.state.passport_expdate} onChange={(event) => this.setState({passport_expdate: event.target.value})} name="passport_expdate" placeholder="Expiry date"/>
                                </div>
                                <div className="form-group col-12">
                                <label htmlFor="input-file-now">Passport Image</label>
                                <input type="file" id="input-file-now" className="dropify"
                                name="passport_image"
                                data-default-file=""
                                placeholder="Passport Image"/>
                                </div>
                            </div>
                        </div>
                        
                        <div className="tab">
                            {resRow}
                            <button type="button" className="btn btn-info" onClick={this.EditProfileDataHandler} id="" >Next</button>
                        </div> 
                        <div className="form-info-actions">
                            <button type="button" className="btn btn-light" id="prevBtn"  >Back</button>
                            <button type="button" className="btn btn-info" id="nextBtn" >Next</button>
                        </div>
                    </form>
                    {/* <!-- End Multi step form --> */}
                </div>
            </Aux>
        );
    }
}

export default EditProfile;