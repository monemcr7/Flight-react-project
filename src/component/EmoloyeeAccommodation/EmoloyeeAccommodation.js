import React, {Component} from 'react';
import axios from '../../axios';
import EmployeeAccommodationCards from '../EmployeeAccommodationCards/EmployeeAccommodationCards';
import $ from 'jquery'; 

class EmployeeAccommodation extends Component {
    state = {
        dataRusult : [],
        cardList : [],
        error : false,
        $out : ''
    }
    componentDidMount() {

        axios.get('https://flights.caduceuslane-digital.com/api/accommodationBooking')
        .then(response => {
            this.setState( { dataRusult: response.data } );
            console.log(response.data)
            const cardList_row =  this.state.dataRusult.result.map(cards => {
            return {
                ...cards
            }
        });
            this.setState( { cardList: cardList_row } );
            console.log(this.state.cardList)
        })
        .catch( error => {
        this.setState( { error: true } );
    } );
    

    }
    

    render() {
        let cardAccommodationRow = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            function formatDate(string){
                var options = { year: 'numeric', month: 'long', day: 'numeric' };
                return new Date(string).toLocaleDateString([],options);
            }
            cardAccommodationRow = this.state.cardList.map(AccommodationRow => {
                
                let checkinDate= formatDate(AccommodationRow.checkin_date);
                // console.log(checkinDate)
                return <EmployeeAccommodationCards 
                    key={AccommodationRow.acc_id}
                    full_name={AccommodationRow.full_name}
                    country_name={AccommodationRow.country_name}
                    city_name={AccommodationRow.city_name}
                    purpose_name={AccommodationRow.purpose_name}
                    checkin_date={checkinDate}
                    approve ={AccommodationRow.approve}
                    approve_name ={AccommodationRow.approve_name}
                />;
            });
    }
    return (
        <div className="row request flight-cards active-cards">
            {cardAccommodationRow}
        </div>
    )
    }
}


export default EmployeeAccommodation;