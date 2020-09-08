import React, {Component} from 'react';
import axios from '../../axios';
import AccommodationRequest_cards from '../AccommodationRequest_cards/AccommodationRequest_cards';
import $ from 'jquery'; 

class UserAccommodation extends Component {
    state = {
        AccommodtionDataRusult : [],
        AccommodtioncardList : [],
        error : false
    }
    componentDidMount() {

        const data = [];
        axios.post('https://flights.caduceuslane-digital.com/api/accommodationsList', data)
        .then(response => {
            this.setState( { AccommodtionDataRusult: response.data } );
            console.log(response.data)
            const cardList_row =  this.state.AccommodtionDataRusult.result.map(cards => {
            return {
                ...cards
            }
        });
            this.setState( { AccommodtioncardList: cardList_row } );
            console.log(this.state.AccommodtioncardList)
        })
        .catch( error => {
        this.setState( { error: true } );
    } );
    

    }
    

    render() {
        let cardAccommodtionRow = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            function formatDate(string){
                var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
                return new Date(string).toLocaleDateString([],options);
            }
            cardAccommodtionRow = this.state.AccommodtioncardList.map(AccommodtionRow => {
                let checkinDate= formatDate(AccommodtionRow.checkin_date);
                return <AccommodationRequest_cards 
                    key={AccommodtionRow.acc_id}
                    country_name={AccommodtionRow.country_name}
                    city_name={AccommodtionRow.city_name}
                    purpose_name={AccommodtionRow.purpose_name}
                    checkin_date={checkinDate}
                    approve ={AccommodtionRow.approve}
                    approve_name ={AccommodtionRow.approve_name}
                    acc_id = {AccommodtionRow.acc_id}
                />;
            });
    }
    return (
        <div className="row request flight-cards active-cards">
            {cardAccommodtionRow}
        </div>
    )
    }
}


export default UserAccommodation;