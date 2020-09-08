import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
class AddUser extends Component {
    state = {  }
    render() { 
        return ( 
            <Aux>
                <div className="col-lg-10 col-md-9 col-sm-10 right-side">
                    <div className="header-title">
                        <h1 className="page-title">Add New User</h1>
                    </div>
                    <form action="" className="wrapper-form addUser" name="addUser">
                        <div className="form-row">
                            <div className="form-group col-lg-4 col-md-5 col-12">
                              <label htmlFor="username">Username</label>
					           <input type="text" className="form-control" placeholder="Username" defaultValue=""/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-lg-4 col-md-5 col-12">
                              <label htmlFor="Group Name">Group Name</label>
					           <input type="text" className="form-control" placeholder="Group Name" defaultValue=""/>
                            </div>
                        </div>
                         <div className="form-row">
                            <div className="form-group col-lg-4 col-md-5 col-12">
                              <label htmlFor="Password">Password</label>
					           <input type="password" className="form-control" placeholder="Password" defaultValue=""/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-lg-4 col-md-5 col-12">
                              <label htmlFor="confirmPassword">Confirm Password</label>
					           <input type="password" className="form-control" placeholder="Confirm Password" defaultValue=""/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-lg-4 col-md-5 col-12">
                              <label htmlFor="filterSelect">
                                    Manager
                                </label>
                                <select className="form-control" id="filterSelect" placeholder="Manager">
                                  <option value="">Manager Name</option>
                                  <option value="" >2</option>
                                  <option value="" >3</option>
                                  <option value="" >4</option>
                                  <option value="" >5</option>
                                </select>
                                <i className="fa fa-chevron-down" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-lg-4 col-md-5 col-12">
                              <label htmlFor="filterSelect">
                                    User Level
                                </label>
                                <select className="form-control" id="filterSelect" placeholder="User Level">
                                  <option value="">User Level</option>
                                  <option value="" >2</option>
                                  <option value="" >3</option>
                                  <option value="" >4</option>
                                  <option value="" >5</option>
                                </select>
                                <i className="fa fa-chevron-down" aria-hidden="true"></i>
                            </div>
                        </div>
                          
                        <div className="form-row form-action">
                        <div className="col-lg-4 col-md-5 col-12 text-right">
                            <button type="" className="btn btn-info backBtn">Save</button>
                        </div>
                        </div>
                    </form>
                </div>
            </Aux>
         );
    }
}
 
export default AddUser;