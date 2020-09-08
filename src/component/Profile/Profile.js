import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Aux from '../../hoc/Aux';
import axios from '../../axios';
import Residency from '../Residency/Residency';
import './Profile.css';
import $ from 'jquery'; 
class Profile extends Component {

    _isMounted = false;
    state = {
        userInfo: [],
        username : '',
        userImage : '',
        email : '',
        national: '',
        birth_date: '',
        phone_num : '',
        market : '',
        medical :'',
        nationality_id : '',
        passport_expdate : '',
        passport_number : '',
        passport_image : '',
        passport_issuedate : '',
        resd_data : [],
        error: false
    }
    componentDidMount () {
        this._isMounted = true;

        axios.get( 'https://flights.caduceuslane-digital.com/api/userInfo', {
            headers: { 'Authorization': localStorage.getItem('token')}
        })
            .then( response => {
                this.setState( { userInfo: response.data } );
                console.log(response.data)
                this.setState({username: this.state.userInfo.personal_passport.full_name});
                // this.setState({userImage: this.state.userInfo.personal_passport.image_profile});
                this.setState({email: this.state.userInfo.personal_passport.email});
                this.setState({national: this.state.userInfo.personal_passport.nationality_name});
                this.setState({birth_date: this.state.userInfo.personal_passport.birth_date});
                this.setState({phone_num: this.state.userInfo.personal_passport.mobile_no});
                this.setState({market: this.state.userInfo.personal_passport.market_name});
                this.setState({medical: this.state.userInfo.personal_passport.medical_status});
                this.setState({national_id: this.state.userInfo.personal_passport.national_id});
                this.setState({passport_expdate: this.state.userInfo.personal_passport.passport_expdate});
                this.setState({passport_number: this.state.userInfo.personal_passport.passport_number});
                this.setState({passport_image: this.state.userInfo.personal_passport.passport_image});
                this.setState({passport_issuedate: this.state.userInfo.personal_passport.passport_issuedate});

                const resd_data_row =  this.state.userInfo.resd_data.map(row => {
                    return {
                        ...row
                    }
                });
                this.setState({resd_data : resd_data_row});

            } )
            .catch( error => {
                this.setState( { error: true } );
            } );
        
        if(localStorage.getItem('level_id') == 0) {
            $("#level").html(" account manager")
        } else if (localStorage.getItem('level_id') == 1) {
            $("#level").html(" manager")
        } else if (localStorage.getItem('level_id') == 2 ) {
            $("#level").html(" traveller")
        } else if (localStorage.getItem('level_id') == 3) {
            $("#level").html(" traveller")
        }

        if(localStorage.getItem('image_profile') == 'https://flights.caduceuslane-digital.com/public/uploads/') {
            $('.user-img img').attr("src", 'https://flights.caduceuslane-digital.com/assets/img/blank-avatar.png');
        } else {
            $('.user-img img').attr("src", localStorage.getItem('image_profile'));
        }
    }

    

//     componentWillUnmount() {
//     this._isMounted = false;
//   }
    render () { 
        let resRow = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            resRow = this.state.resd_data.map(row => {
                return <Residency 
                    key={row.resd_id}
                    issue_date_data={row.issue_date_data}
                    expire_date_data={row.expire_date_data}
                    resdiency_image_data={row.resdiency_image_data}
                    destination_data={row.destination_data}
                    resd_number_data={row.resd_number_data}
                />;
            });
        }
        
        return (
            <Aux >
            <div className="profile-content bG-white">
                <div className="row">
                    <div className="col-12">
                        <div className="user-top-img">
                            <div className="user-img">
                                <img src={"https://flights.caduceuslane-digital.com/public/uploads/" + this.state.userImage}  alt="user"/>
                            </div>
                            <div className="user-info">
                                {this.state.username}
                                <span id="level"></span>
                            </div>
                            <div className="editProfile">
                            <Link to="/Edit_Profile" className="btn btn-light"><i className="fa fa-pencil" aria-hidden="true"></i></Link>
                            <span>Edit</span>
                        </div>
                        </div> 
                    </div>
                    
                </div>
                <div className="row">
                    <div className="col-12">
                        <nav >
                            <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                <a className="nav-item nav-link active"
                                    id="nav-personal-tab"
                                    data-toggle="tab"
                                    href="#nav-personal" 
                                    role="tab" aria-controls="nav-home"
                                    aria-selected="true">Personal Information</a>
                                    
                                <a className="nav-item nav-link"
                                    id="nav-passport-tab" data-toggle="tab"
                                    href="#nav-passport" role="tab" aria-controls="nav-passport"
                                    aria-selected="false">Passport Data</a>
                                    
                                <a className="nav-item nav-link" 
                                id="nav-residency-tab" 
                                data-toggle="tab" 
                                href="#nav-residency" 
                                role="tab" aria-controls="nav-residency" 
                                aria-selected="false">Residency Data</a>
                            </div>
                        </nav>
                        <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-personal" role="tabpanel" aria-labelledby="nav-personal-tab">
                                <div className="row">
                                    <div className="col-lg-4 col-md-5 col-sm-6 info-row">
                                        <h5>Name As in Passport</h5>
                                        <p>
                                        {this.state.username}
                                        </p>
                                    </div>
                                    <div className="col-lg-4 col-md-5 col-sm-6 info-row">
                                        <h5>Nationality</h5>
                                        <p id="nationlity">{this.state.national}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4 col-md-5 col-sm-6 info-row">
                                        <h5>Birthdate</h5>
                                        <p id="birthday">{this.state.birth_date}</p>
                                    </div>
                                    <div className="col-lg-4 col-md-5 col-sm-6 info-row">
                                        <h5>Phone number</h5>
                                        <p id="phone-num">{this.state.phone_num}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4 col-md-5 col-sm-6 info-row">
                                        <h5>Email</h5>
                                        <p id="email">{this.state.email}</p>
                                    </div>
                                    <div className="col-lg-4 col-md-5 col-sm-6 info-row">
                                        <h5>Market</h5>
                                        <p id="market">{this.state.market}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4 col-md-5 col-sm-6 info-row">
                                        <h5>Medical Status</h5>
                                        <p id="medical">{this.state.medical}</p>
                                    </div>
                                    <div className="col-lg-4 col-md-5 col-sm-6 info-row">
                                        <h5>National ID</h5>
                                        <p id="national_id">{this.state.national_id}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="nav-passport" role="tabpanel" aria-labelledby="nav-passport-tab">
                                <div className="row passInfo">
                                    <div className="col-12">
                                        <div className=" pass-img row">
                                            <div className="col-lg-8 col-md-6 col-12">
                                                <img id="pass-img" src={"https://flights.caduceuslane-digital.com/public/uploads/" + this.state.passport_image}  alt="passport"/>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12">
                                                <ul>
                                                    <li>
                                                        <h5>Passport Number</h5>
                                                        <p id="pass-num">{this.state.passport_number}</p>
                                                    </li>
                                                    <li>
                                                        <h5>Issue Date </h5>
                                                        <p id="pass-issueDate">{this.state.passport_issuedate}</p>
                                                    </li>
                                                    <li>
                                                        <h5>Expiry Date</h5>
                                                            <p id="pass-expiryDate">{this.state.passport_expdate}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* <h5>Passport Image</h5> */}
                                            
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="tab-pane fade" id="nav-residency" role="tabpanel" aria-labelledby="nav-residency-tab">
                                {resRow}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </Aux>
        );
    }
}

 
export default Profile;