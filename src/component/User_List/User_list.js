import React from 'react';
import { Link } from 'react-router-dom';
import DeleteModal from '../Delete_Modal/Delete_Modal';
import Aux from '../../hoc/Aux';

class UserList extends React.Component {
    constructor(props) {
      super(props);
      this.handleModalShowClick = this.handleModalShowClick.bind(this);
      this.handleModalCloseClick = this.handleModalCloseClick.bind(this);
      this.state = {
        showModal: false,
      }
    }
  
    handleModalShowClick(e) {
      e.preventDefault();
      this.setState({
        showModal: true
      })
    }
  
    handleModalCloseClick() {
      this.setState({
        showModal: false
      })
    }
  
    render() {
      console.log(this.state)
      const { showModal } = this.state;
      return(
        <Aux>
            <div className="row">
                <div className="col-md-8 col-5">
                    <h1 className="page-title">User list</h1>
                </div>
                <div className="col-md-4 col-7 text-right">
                    <span className="add-user">
                        Add User
                        <Link to="/Add_User">
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </Link>
                    </span>
                </div>
            </div>
            {/* <!--Start User List Tabel --> */}
            <div className="row ">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">GROUP NAME</th>
                                    <th scope="col">MANAGER</th>
                                    <th scope="col">USER LEVEL</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th className="id" scope="row">1</th>
                                    <td className="name">Sara Essawy</td>
                                    <td className="group">Finance Group</td>
                                    <td className="manager">@M Todary</td>
                                    <td className="level">Level</td>
                                    <td className="action">
                                    <Link to="/" className="btn btn-light"><i className="fa fa-pencil" aria-hidden="true"></i></Link>

                                    <a className="btn btn-light" onClick={this.handleModalShowClick}><i className="fa fa-trash" aria-hidden="true"></i> </a>
                                    {showModal ? (<DeleteModal handleModalCloseClick={this.handleModalCloseClick} />) : null}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Aux>
      );
    }
  }


export default UserList;