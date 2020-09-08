import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import './Add_Group.css';
class AddGroup extends Component {
    state = {  }
    render() { 
        return ( 
            <Aux>
                <div className="row">
                    <div className="col-12">
                        <h1 className="page-title">Add Group</h1>
                        <form className="search-group-form ">
                            <div className="form-row ">
                            <div className="form-group col-xl-2 col-lg-3 col-md-4 col-12">
                                <input type="text" className="form-control" id="employee" placeholder="Group Name"/>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
                <form action="" className="row">
                      {/* <!-- Start Add Col --> */}
                       <div className="col-lg-3 col-md-6 col-6">
                            <div className="row-header">
                                <span className="text-header">ADD</span>
                                <label className="custom-control overflow-checkbox">
                                    <input type="checkbox" id="ckbCheckAll" className="overflow-control-input"/>
                                    <span className="overflow-control-indicator"></span>
                                    <span className="overflow-control-description">SELECT ALL</span>
                                </label>
                            </div>
                            <div className="checkBox-group" id="addBox">
                                <div className="checkBox-row row">
                                    <label className="custom-control overflow-checkbox">
                                    <input type="checkbox" className="overflow-control-input"/>
                                    <span className="overflow-control-indicator"></span>
                                    <span className="overflow-control-description">Users</span>
                                    </label>
                                </div>
                                
                                <div className="checkBox-row row">
                                    <label className="custom-control overflow-checkbox">
                                        <input type="checkbox" className="overflow-control-input"/>
                                        <span className="overflow-control-indicator"></span>
                                        <span className="overflow-control-description">Services</span>
                                    </label>
                                </div>
                                
                                <div className="checkBox-row row">
                                    <label className="custom-control overflow-checkbox">
                                        <input type="checkbox" className="overflow-control-input"/>
                                        <span className="overflow-control-indicator"></span>
                                        <span className="overflow-control-description">Groups</span>
                                    </label>
                                </div>
                            </div>
                       </div>
                       {/* <!-- Start Edit Col --> */}
                       <div className="col-lg-3 col-md-6 col-6">
                            <div className="row-header">
                                <span className="text-header">EDIT</span>
                                <label className="custom-control overflow-checkbox">
                                    <input type="checkbox" id="ckbCheckAllEdit" className="overflow-control-input"/>
                                    <span className="overflow-control-indicator"></span>
                                    <span className="overflow-control-description">SELECT ALL</span>
                                </label>
                            </div>
                            <div className="checkBox-group" id="editBox">
                                <div className="checkBox-row row">
                                    <label className="custom-control overflow-checkbox">
                                    <input type="checkbox" className="overflow-control-input"/>
                                    <span className="overflow-control-indicator"></span>
                                    <span className="overflow-control-description">Users</span>
                                    </label>
                                </div>
                                
                                <div className="checkBox-row row">
                                    <label className="custom-control overflow-checkbox">
                                        <input type="checkbox" className="overflow-control-input"/>
                                        <span className="overflow-control-indicator"></span>
                                        <span className="overflow-control-description">Services</span>
                                    </label>
                                </div>
                                
                                <div className="checkBox-row row">
                                    <label className="custom-control overflow-checkbox">
                                        <input type="checkbox" className="overflow-control-input"/>
                                        <span className="overflow-control-indicator"></span>
                                        <span className="overflow-control-description">Groups</span>
                                    </label>
                                </div>
                            </div>
                       </div>
                       {/* <!--Start Delete Col --> */}
                       <div className="col-lg-3 col-md-6 col-6">
                            <div className="row-header">
                                <span className="text-header">DELETE</span>
                                <label className="custom-control overflow-checkbox">
                                    <input type="checkbox" id="ckbCheckAllDelete" className="overflow-control-input"/>
                                    <span className="overflow-control-indicator"></span>
                                    <span className="overflow-control-description">SELECT ALL</span>
                                </label>
                            </div>
                            <div className="checkBox-group" id="delBox">
                                <div className="checkBox-row row">
                                    <label className="custom-control overflow-checkbox">
                                    <input type="checkbox" className="overflow-control-input"/>
                                    <span className="overflow-control-indicator"></span>
                                    <span className="overflow-control-description">Users</span>
                                    </label>
                                </div>
                                
                                <div className="checkBox-row row">
                                    <label className="custom-control overflow-checkbox">
                                        <input type="checkbox" className="overflow-control-input"/>
                                        <span className="overflow-control-indicator"></span>
                                        <span className="overflow-control-description">Services</span>
                                    </label>
                                </div>
                                
                                <div className="checkBox-row row">
                                    <label className="custom-control overflow-checkbox">
                                        <input type="checkbox" className="overflow-control-input"/>
                                        <span className="overflow-control-indicator"></span>
                                        <span className="overflow-control-description">Groups</span>
                                    </label>
                                </div>
                            </div>
                       </div>
                       {/* <!-- Start View Col --> */}
                       <div className="col-lg-3 col-md-6 col-6">
                            <div className="row-header">
                                <span className="text-header">VIEW</span>
                                <label className="custom-control overflow-checkbox">
                                    <input type="checkbox" id="ckbCheckAllView" className="overflow-control-input"/>
                                    <span className="overflow-control-indicator"></span>
                                    <span className="overflow-control-description">SELECT ALL</span>
                                </label>
                            </div>
                            <div className="checkBox-group" id="viewBox">
                                <div className="checkBox-row row">
                                    <label className="custom-control overflow-checkbox">
                                    <input type="checkbox" className="overflow-control-input"/>
                                    <span className="overflow-control-indicator"></span>
                                    <span className="overflow-control-description">Users</span>
                                    </label>
                                </div>
                                
                                <div className="checkBox-row row">
                                    <label className="custom-control overflow-checkbox">
                                        <input type="checkbox" className="overflow-control-input"/>
                                        <span className="overflow-control-indicator"></span>
                                        <span className="overflow-control-description">Services</span>
                                    </label>
                                </div>
                                
                                <div className="checkBox-row row">
                                    <label className="custom-control overflow-checkbox">
                                        <input type="checkbox" className="overflow-control-input"/>
                                        <span className="overflow-control-indicator"></span>
                                        <span className="overflow-control-description">Groups</span>
                                    </label>
                                </div>
                            </div>
                       </div>
                       {/* <!-- Start Form Actions --> */}
                       <div className="col-12 text-right form-action-checkbox">
                           <button className="btn btn-light cancel">CANCEL</button>
                           <button className="btn btn-light add">SAVE & ADD</button>
                           <button className="btn btn-light save">SAVE</button>
                       </div>
                    </form>
            </Aux>
         );
    }
}
 
export default AddGroup;