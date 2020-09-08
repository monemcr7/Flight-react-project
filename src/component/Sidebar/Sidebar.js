import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import Aux from '../../hoc/Aux';


class Sidebar extends Component { 

    render () {
        let lv_1 = null;
        let lv_2 = null;
        let lv_0 = null;
        
        if (localStorage.getItem('level_id') == 2) {
            lv_2 = (
                <Aux>
                    <NavLink activeClassName="active" exact to="/My_Employees" className="list-group-item list-group-item-action"><i className="fa fa-commenting" aria-hidden="true"></i><span>Requests</span></NavLink>
                    <NavLink to="/Profile" className="list-group-item list-group-item-action"><i className="fa fa-user" aria-hidden="true"></i><span>Profile</span></NavLink>
                </Aux>
            )
        } else if (localStorage.getItem('level_id') == 0) {
            lv_0 = (
                <Aux>
                    <NavLink activeClassName="active" exact to="/My_requests" className="list-group-item list-group-item-action"><i className="fa fa-commenting" aria-hidden="true"></i><span>My Requests</span></NavLink>
                    <NavLink to="/Profile" className="list-group-item list-group-item-action"><i className="fa fa-user" aria-hidden="true"></i><span>Profile</span></NavLink>
                    <NavLink to="/History" className="list-group-item list-group-item-action"><i className="fa fa-history" aria-hidden="true"></i><span>History</span></NavLink>
                </Aux>
            )
        } else {
            lv_1 = (
                <Aux>
                <NavLink activeClassName="active" exact to="/My_requests" className="list-group-item list-group-item-action"><i className="fa fa-commenting" aria-hidden="true"></i><span>My Requests</span></NavLink>
                <NavLink to="/Profile" className="list-group-item list-group-item-action"><i className="fa fa-user" aria-hidden="true"></i><span>Profile</span></NavLink>
                <NavLink to="/Employees_Requests" className="list-group-item list-group-item-action"><i className="fa fa-comments" aria-hidden="true"></i><span>Employees Requests</span></NavLink>
                <NavLink to="/My_Employees" className="list-group-item list-group-item-action"><i className="fa fa-users" aria-hidden="true"></i><span>Team members</span></NavLink>
                <NavLink to="/History" className="list-group-item list-group-item-action"><i className="fa fa-history" aria-hidden="true"></i><span>History</span></NavLink>
                <NavLink to="/HistoryEmployess" className="list-group-item list-group-item-action"><i className="fa fa-history" aria-hidden="true"></i><span>History Employees</span></NavLink>
                </Aux>
            );
        }
        return (
            <Aux>
            <div id="show-sidebar" className="col-12">
                <button className="btn btn-sm btn-dark" >
                <i className="fa fa-bars"></i>
                </button>
            </div>
            <div className="sidebar-wrapper col-lg-2 col-md-3 col-sm-2 left-side">
                <section id="sidebar-wrapper">
                    <div id="close-sidebar">
                        <i className="fa fa-times"></i>
                    </div>
                    <div className="sidebar-heading">
                        <div className="user-img">
                            <img src={require("../../assets/img/blank-avatar.png")} alt="user"/>
                        </div>
                        <div className="user-info">
                            <span>Welcome</span>
                            <div>John Doe</div>
                        </div>
                        <hr/>
                    </div>
                    <div className="list-group list-group-flush">
                        {lv_0}
                        {lv_1}
                        {lv_2}
                    </div>
                    <div className="sidebar-img">
                        <img src={require("../../assets/img/MaskGroup.png")} alt="icon"/>
                    </div>
                </section>
            </div>
            </Aux>
            
    );
    }
    
};

export default Sidebar;