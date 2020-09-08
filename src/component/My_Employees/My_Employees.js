import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import axios from '../../axios';
import Employess_cards from '../MyEmployeesCards/MyEmployeesCards';
class MyEmployees extends Component {
    state = {
        myEmployeesList : [],
        employeesResult : [],
        error : false,
    }

    componentDidMount() {

        axios.get('https://flights.caduceuslane-digital.com/api/myEmployees')
        .then(response => {
            this.setState( { myEmployeesList: response.data } );
            console.log(response.data)
            const employees_row =  this.state.myEmployeesList.result.map(cards => {
            return {
                ...cards
            }
        });
            this.setState( { employeesResult: employees_row } );
            console.log(this.state.employeesResult)
        })
        .catch( error => {
        this.setState( { error: true } );
    } );
    

    }

    render () {
        let cardEmployees = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            
            cardEmployees = this.state.employeesResult.map(employeesRow => {
                let level= '';
                if (employeesRow.level_id == 0) {
                    level = "Account Manager";
                } else if (this.props.approve == 1) {
                    level = "Manager";
                } else if (this.props.approve == 2) {
                    level = "Traveller";
                } else if (this.props.approve == 3) {
                    level = "Finance ";
                }

                let img = null;
                if ( employeesRow.image_profile == null) {
                    img = 'https://flights.caduceuslane-digital.com/assets/img/blank-avatar.png';
                } else {
                    img = "https://flights.caduceuslane-digital.com/public/uploads/" + employeesRow.image_profile;
                }
                return <Employess_cards 
                    key={employeesRow.user_id}
                    employee_name={employeesRow.employee_name}
                    image_profile={img}
                    level_id={level}
                />;
            });
    }

        return (
            <Aux>
            <div className="row">
                <div className="col-6">
                    <h1 className="page-title">My Employees</h1>
                </div>
                <div className="col-12">
                    <hr className="divider"/>
                </div>
            </div> 
            
            <div className="row request employees-row active-cards">
                {cardEmployees}
            </div>
        </Aux> 
        );
    }
}


export default MyEmployees;