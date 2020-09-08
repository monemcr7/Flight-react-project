import React, {Component} from 'react';
import axios from '../../axios';
import EmployeeFlightCards from '../EmployeeFlightCards/EmployeeFlightCards';
import $ from 'jquery'; 

class EmployeeFlight extends Component {
    state = {
        dataRusult : [],
        cardList : [],
        error : false,
        $out : ''
    }
    componentDidMount() {

        axios.get('https://flights.caduceuslane-digital.com/api/flightBooking')
        .then(response => {
            this.setState( { dataRusult: response.data } );
            console.log(response.data)
            const cardList_row =  this.state.dataRusult.result.map(cards => {
            return {
                ...cards
            }
        });
            this.setState( { cardList: cardList_row } );
            
        })
        .catch( error => {
        this.setState( { error: true } );
        console.log(error)
    } );
    

    }
    

    render() {
        let cardFlightRow = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            function formatDate(string){
                var options = { year: 'numeric', month: 'long', day: 'numeric' };
                return new Date(string).toLocaleDateString([],options);
            }
            cardFlightRow = this.state.cardList.map(row => {
                let checkinDate= formatDate(row.date_time);
                return <EmployeeFlightCards 
                    key={row.flight_id}
                    full_name={row.full_name}
                    fare_name={row.fare_name}
                    city_from={row.city_from}
                    city_to={row.city_to}
                    purpose_name={row.purpose_name}
                    checkin_date={checkinDate}
                    approve ={row.approve}
                    approve_name ={row.approve_name}
                />;
            });
    }
    return (
        <div className="row request flight-cards active-cards">
            {cardFlightRow}
        </div>
    )
    }
}


export default EmployeeFlight;