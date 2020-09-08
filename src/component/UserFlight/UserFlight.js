import React, {Component} from 'react';
import axios from '../../axios';
import FlightCard from '../Request_cards/Request_cards';
import $ from 'jquery'; 

class FlightRequset extends Component {
    state = {
        dataRusult : [],
        cardList : [],
        error : false,
        $out : '',
    }
    componentDidMount() {
        this.getDataHendler();
    }

    getDataHendler() {
        $('.loading-overlay').removeClass('overlay-hidden');
        const data = [];
            axios.post('https://flights.caduceuslane-digital.com/api/flightsList', data)
            .then(response => {
                if (response.status === 200) {
                    this.setState( { dataRusult: response.data } );
                    console.log(response.data)
                    const cardList_row =  this.state.dataRusult.result.map(cards => {
                    return {
                        ...cards
                    }
                    });
                    this.setState( { cardList: cardList_row } );
                    console.log(this.state.cardList)
                    $('.loading-overlay').addClass('overlay-hidden');
                }
            })
            .catch( error => {
            this.setState( { error: true } );
        } );

    }


    

    render() {
        let cardFlightRow = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            function formatDate(string){
                var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
                return new Date(string).toLocaleDateString([],options);
            }
            cardFlightRow = this.state.cardList.map(row => {
                let checkinDate= formatDate(row.checkin_date);
                return <FlightCard 
                    key={row.flight_id}
                    fare_type={row.fare_type}
                    city_from={row.city_from}
                    city_to={row.city_to}
                    purpose_name={row.purpose_name}
                    checkin_date={checkinDate}
                    approve ={row.approve}
                    approve_name ={row.approve_name}
                    flight_id={row.flight_id}
                    change={this.getDataHendler}
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


export default FlightRequset;