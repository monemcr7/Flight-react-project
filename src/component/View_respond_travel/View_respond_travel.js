import React from 'react';
import Aux from '../../hoc/Aux';
import $ from 'jquery';
import axios from '../../axios';


class viewRespond extends React.Component {


    state = {
        selected: '1'
    }


    componentDidUpdate () {
        console.log("data"+ this.state.selected)
    }


    handlerSendButton = () => {
            $("input").removeClass("invalid");
            var valid = true;
            var val = this.state.selected;
            var comment = this.state.content;
            console.log(comment);
            
            if (val == 1) {
                var form = new FormData($("#form-select")[0]);
                $.ajax({
                    type: "POST",
                    headers: { 'Authorization': localStorage.getItem('token')},
                    url: 'https://flights.caduceuslane-digital.com/api/accept_unlockFlight',
                    data: form,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        console.log(res)
                        if(res.success){
                            console.log(res)
                        }
                    },
                    error: function(res){
                        console.log(res)
                        if( res.status === 422 ) {
                            console.log(res)
                        }
                    }
                });
            }

            if (val == 2) {
                var form = new FormData($("#form-select")[0]);
                $.ajax({
                    type: "POST",
                    headers: { 'Authorization': localStorage.getItem('token')},
                    url: 'https://flights.caduceuslane-digital.com/api/reject_unlockFlight',
                    data: form,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        console.log(res)
                        if(res.success){
                            console.log(res)
                        }
                    },
                    error: function(res){
                        console.log(res)
                        if( res.status === 422 ) {
                            console.log(res)
                        }
                    }
                });
            }

            return valid;
    }


    render() {

        return(
            <Aux>      
            <div className="row">
            <div className="col-12">
                <form className="form-select" id="form-select">
                    <div className="form-row">
                        <h2 className="title-form">Respond to Request</h2>
                        <div className="col-12 select-radio">
                            <input 
                            type="radio" 
                            id="approve" 
                            name="approve" 
                            value="1"
                            checked={this.state.selected === '1'} onChange={(e) => this.setState({ selected: e.target.value })} />
                            <label htmlFor="approve">Approve</label>

                            <input 
                            type="radio"
                            id="reject"
                            name="approve"
                            value="2"
                            checked={this.state.selected === '2'} onChange={(e) => this.setState({ selected: e.target.value })}/>
                            
                            <label htmlFor="reject">Reject </label>

                        </div>
                    </div>
                    {
                        this.state.selected === '1' ?
                        <div>
                            <div className="form-row form-action">
                                <div className="col-12 text-right">
                                    <button type="button" className="btn btn-info backBtn" onClick={this.handlerSendButton}>SEND</button>
                                </div>
                            </div>
                        </div>
                        : <div>
                            <div className="form-row form-action">
                                <div className="col-12 text-right">
                                    <button type="button" className="btn btn-info backBtn" onClick={this.handlerSendButton}>SEND</button>
                                </div>
                            </div>
                        </div>
                    } 
                </form>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12">
                <hr className="divider"/>
            </div>
        </div>
    </Aux> 
        );
    }
}
    
    

export default viewRespond;