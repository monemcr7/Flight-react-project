import React from 'react';
import Aux from '../../hoc/Aux';
import { Editor } from '@tinymce/tinymce-react';
import $ from 'jquery';
import axios from '../../axios';


class viewRespond extends React.Component {


    state = {
        selected: '1',
        content: ''
    }

    handleEditorChange = (content, editor) => {
        this.setState({
            content : content
        })
        console.log('Content was updated:', content);
    }

    componentDidUpdate () {
        console.log("data"+ this.state.selected)
    }

    handlerRejectButton = () => {
        const data = {
            flight_id : this.props.flightID
        }
        axios
        .post('/rejectFlightBooking', data)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => console.log(error.response));
    }

    handlerSendButton = () => {
            $("input").removeClass("invalid");
            var valid = true;
            var val = this.state.selected;
            var comment = this.state.content;
            console.log(comment);
            if(val == -3 && comment ==''){
                $('.tox-tinymce').addClass("invalid");
                valid = false;
                $('.addComment').append(`<span className="error-validate">Enter Your Comment.</span>`);
            } else {
                var form = new FormData($("#form-select")[0]);
                $.ajax({
                    type: "POST",
                    headers: { 'Authorization': localStorage.getItem('token')},
                    url: 'https://flights.caduceuslane-digital.com/api/saveFlightcomment',
                    data: form,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        if(res.success){
                            console.log(res)
                        }
                    },
                    error: function(res){
                        if( res.status === 422 ) {
                            console.log(res)
                        }
                    }
                });
            }

            if (val == 1) {
                if(comment =='') {
                    var form = new FormData($("#form-select")[0]);
                    $.ajax({
                        type: "POST",
                        headers: { 'Authorization': localStorage.getItem('token')},
                        url: 'https://flights.caduceuslane-digital.com/api/approveFlightRequest',
                        data: form,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (res) {
                            if(res.success){
                                console.log("data" + res)
                            }
                        },
                        error: function(res){
                            if( res.status === 422 ) {
                                console.log("data" + res)
                            }
                        }
                    });
                } else {
                    var form = new FormData($("#form-select")[0]);
                    $.ajax({
                        type: "POST",
                        headers: { 'Authorization': localStorage.getItem('token')},
                        url: 'https://flights.caduceuslane-digital.com/api/saveFlightcomment',
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
                
            }

            return valid;
    }


    render() {
        let comment = <Aux>
                <div className="form-row addComment">
                    <div className="form-group col-12 ">
                        <label htmlFor="addComment">Add Comment</label>
                        <p className="notesFlight">
                            Please note that, in case of adding a comment here, request will be directly sent to the travel agent after account manager modifies his request according to your instructions.
                        </p>
                        <Editor
                            tagName='comment'
                            initialValue="Write your comment here"
                            init={{
                            height: 150,
                            menubar: false,
                            statusbar:false,
                            resize: false,
                            relative_urls : false,
                            remove_script_host : false,
                            plugins: [
                                "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
                                "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                                "save table contextmenu directionality emoticons template paste textcolor"
                            ],
                            toolbar:
                                " styleselect | bold italic | bullist numlist "
                            }}
                            onEditorChange={this.handleEditorChange}
                        />
                    </div>
                </div>
                <div className="form-row form-action">
                    <div className="col-12 text-right">
                        <button type="button" className="btn btn-info backBtn" onClick={this.handlerSendButton}>SEND</button>
                    </div>
                </div>
            </Aux>
    

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
                            value="-2"
                            checked={this.state.selected === '-2'} onChange={(e) => this.setState({ selected: e.target.value })}/>
                            
                            <label htmlFor="reject">Reject </label>

                            <input 
                            type="radio"
                            id="Comment"
                            name="approve"
                            value="-3"
                            checked={this.state.selected === '-3'} onChange={(e) => this.setState({ selected: e.target.value })}/>
                            
                            <label htmlFor="Comment">Comment </label>
                        </div>
                    </div>
                    {
                        this.state.selected === '1' ?
                        <div>
                            {comment}
                        </div>
                        : this.state.selected === '-3' ?
                        <div>
                            {comment}
                        </div>
                        : <div className="form-row form-action">
                            <div className="col-12 text-right">
                                <button onClick={this.handlerRejectButton} type="button" className="btn btn-info backBtn">Reject</button>
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