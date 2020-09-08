import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Logout from '../Logout/Logout';
import './Header.css';
import $ from 'jquery'; 

class Header extends Component {

    componentDidMount () {
        $('#fullname, .user-info div').html(localStorage.getItem('full_name'));
        

        if(localStorage.getItem('image_profile') == 'https://flights.caduceuslane-digital.com/public/uploads/') {
            $('.user-img img').attr("src", 'https://flights.caduceuslane-digital.com/assets/img/blank-avatar.png');
        } else {
            $('.user-img img').attr("src", localStorage.getItem('image_profile'));
        }

        if(localStorage.getItem('level_id') == 0) {
            $("#level_text").html(" account manager")
        } else if (localStorage.getItem('level_id') == 1) {
            $("#level_text").html(" manager")
        } else if (localStorage.getItem('level_id') == 2 ) {
            $("#level_text").html(" traveller")
        } else if (localStorage.getItem('level_id') == 3) {
            $("#level_text").html(" traveller")
        }
    }
    
    render() { 
        return (
            <section className="navbar-section">
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm  bg-white rounded">
                <Link className="navbar-brand" to="/">
                    <img src={require("../../assets/img/logo-text.png")}  alt="logo"/>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
    
                <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
                    <ul className="navbar-nav ">
                        <li className="nav-item user-link">
                            <Link className="nav-link" to="/Profile">
                                <div className="user-img">
                                    <img src={require("../../assets/img/blank-avatar.png")} alt="user"/>
                                </div>
                                <div className="user-info">
                                    <div id="fullname"></div>
                                    <span id="level_text"></span>
                                </div>
                            </Link>
                            
                        </li>
                        <li className="nav-item settings dropdown">
                            <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdownMenuSettings" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-cog icon-links" aria-hidden="true"></i>
                            </Link>
                            <div className="dropdown-menu dropdown-list" aria-labelledby="navbarDropdownMenuSettings">
                                <Link className="dropdown-item" to="User_List"><i className="fa fa-list-ul" aria-hidden="true"></i> User List</Link>
                                <Link className="dropdown-item" to="/Add_Group"><i className="fa fa-users" aria-hidden="true"></i>Group List</Link>
                                <Link className="dropdown-item d-block d-sm-none" to="/Profile"><i className="fa fa-user" aria-hidden="true"></i>Profile</Link>
                            </div>
                        </li>
                        <li className="nav-item notification dropdown">
                            <Link to="#"  className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-bell icon-links" aria-hidden="true"></i>
                                <span className="active-notification"></span>
                            </Link>
                            <div className="dropdown-menu dropdown-list" aria-labelledby="navbarDropdownMenuLink">
                                <Link to="#" className="dropdown-item active-row" >
                                    <div className="userNameNoti">
                                        <p>John Doe</p>
                                        <span className="message">Approved Your Flight Request</span>
                                    </div>
                                    <div className="notification-date">
                                        Monday 22 Sep,2019
                                    </div>
                                </Link>
                                <Link className="dropdown-item" to="">
                                    <div className="userNameNoti">
                                        <p>John Doe</p>
                                        <span className="message">Approved Your Flight Request</span>
                                    </div>
                                    <div className="notification-date">
                                        Monday 22 Sep,2019
                                    </div>
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item logout">
                            <Logout />
                            {/* <Link className="nav-link" to="/LoginForm">
                                <i className="fa fa-power-off icon-links" aria-hidden="true"></i>
                            </Link> */}
                        </li>
                    </ul>
                </div>
            </nav>
        </section>
        );
    }
    
};

export default Header;