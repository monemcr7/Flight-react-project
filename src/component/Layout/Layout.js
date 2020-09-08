import React, {Component} from 'react';
import {Route, Switch } from 'react-router-dom';
import Aux from '../../hoc/Aux';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import My_requests  from '../My-Requests/My-Requests';
// import Requests  from '../Request/Request';
import Profile from '../Profile/Profile';
import Employees_Requests from '../Employees_Requests/Employees_Requests';
import myEmployees from '../My_Employees/My_Employees';
import History from '../History/History';
import Add_Accommodation from '../Add_Accommodation/Add_Accommodation';
import Add_Flight from '../Add_Flight/Add_Flight';
import View_Request from '../View_Request/View_Request';
import View_Accommodation from '../View_Accommodation/View_Accommodation';
import AddGroup from '../Add_Group/Add_Group';
import UserList from '../User_List/User_list';
import AddUser from '../Add_User/Add_User';
import EditProfile from '../Edit_Profile/Edit_Profile';
import EditFlight from '../Edit_Flight/Edit_flight';
import HistoryEmployees from '../HistoryEmployess/HistoryEmployess'
import $ from 'jquery'; 

class Layout extends Component {


    render () {
        return (
            <Aux>
                <Header />
                <section id="wrapper" className="content">
                    <div className="container-fluid">
                        <div className="row">
                        <Sidebar />
                            <div className="col-lg-10 col-md-9 col-sm-10 right-side">
                                <Switch>
                                    <Route path="/My_requests" exact component={My_requests} />
                                    <Route path="/Profile"  component={Profile} />
                                    <Route path="/Employees_Requests"  component={Employees_Requests} />
                                    <Route path="/My_Employees"  component={myEmployees} />
                                    <Route path="/History"  component={History} />
                                    <Route path="/HistoryEmployees"  component={HistoryEmployees} />
                                    <Route path="/Add_Accommodation"  component={Add_Accommodation} />
                                    <Route path="/Add_Flight"  component={Add_Flight} />
                                    <Route path="/View_Request"  component={View_Request} />
                                    <Route path="/Add_Group"  component={AddGroup} />
                                    <Route path="/User_List"  component={UserList} />
                                    <Route path="/Add_User"  component={AddUser} />
                                    <Route path="/Edit_Profile"  component={EditProfile} />
                                    <Route path="/Edit_Flight"  component={EditFlight} />
                                    <Route path="/View_Accommodation"  component={View_Accommodation} />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="loading-overlay overlay-hidden"><div className="reverse-spinner"></div></div> 
            </Aux> 
        );
    }
}

export default Layout;