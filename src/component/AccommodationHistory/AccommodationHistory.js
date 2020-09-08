import React, {Component} from 'react';
import axios from '../../axios';
import AccommodationHistoryCards from '../AccommodationHistoryCards/AccommodationHistoryCards';
import $ from 'jquery'; 

class AccommodationHistory extends Component {
    state = {
        dataRusult : [],
        cardList : [],
        error : false
    }
    componentDidMount() {

        const data = [];
        axios.post('https://flights.caduceuslane-digital.com/api/accommodationHistory', data)
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
        let cardFlightRow = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            function formatDate(string){
                var options = { year: 'numeric', month: 'long', day: 'numeric' };
                return new Date(string).toLocaleDateString([],options);
            }
            cardFlightRow = this.state.cardList.map(row => {
                let checkinDate= formatDate(row.date_time);
                return <AccommodationHistoryCards 
                    key={row.flight_id}
                    fare_name={row.fare_name}
                    city_from={row.city_from}
                    city_to={row.city_to}
                    purpose_name={row.purpose_name}
                    date_time={checkinDate}
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


export default AccommodationHistory;