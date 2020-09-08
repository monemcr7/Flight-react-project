import React ,{ Component } from 'react';
import Aux from '../../hoc/Aux';
import $ from 'jquery'; 


class View_employees extends Component {
    componentDidMount() {
        console.log(this.props.emp_name);

        
    }
    render() {
        let employee = null;
        
        employee = this.props.emp_name.map(row => {
            let img = null;
            if ( row.image_profil == undefined) {
                img = 'https://flights.caduceuslane-digital.com/assets/img/blank-avatar.png';
                console.log('test')
            } else {
                img = "https://flights.caduceuslane-digital.com/public/uploads/" + row.image_profil;
                console.log(row.image_profil )
            }

            return (
                <li key={row.user_id}>
                    <img src={img}  alt="user"/>
                    <span>{row.full_name}</span>
                </li>
            )
        })
        
        return(
            <Aux>      
                <div className="row">
                    <div className="col-sm-12">
                        <hr className="divider"/>
                    </div>
                </div>
                <div className="row Employees-sec">
                    <ul className="list-unstyled">
                        <h2 className="sec-title">Employees</h2>
                        {employee}
                    </ul>
                </div>
            </Aux> 
        )
    }
}


export default View_employees;