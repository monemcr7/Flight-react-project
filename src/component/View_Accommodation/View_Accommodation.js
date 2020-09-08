import React, { Component } from 'react';
import { Redirect, Route, Switch,  Link  } from 'react-router-dom';
import axios from '../../axios';
import $ from 'jquery';
import Aux from '../../hoc/Aux';
import '../View_Request/View_Request.css';
import Comments from '../View_comment/View_commnet';
import Respons from '../View_respond/View_respond';
import ResponsTravel from '../View_respond_travel/View_respond_travel';
import View_employees from '../View_employees/View_employees';
import View_notes from '../View_notes/View_notes';
import Select from 'react-select';
import SuccessModal from '../successModal/successModal';
import DeleteModal from '../Delete_Modal/Delete_Modal';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();


class view_Accommodation extends Component {
    state = {
        data : this.props.location.state && this.props.location.state.referrer,
        manager_id : localStorage.getItem('manager_id'),
    }

    componentDidMount() {
        console.log(this.state.data)
    }
    render() {

        let comment =null;
        
        if (this.state.manager_id == localStorage.getItem('manager_id')) {
            
            if (Object.keys(this.state.data.comment).length === 0 && this.state.data.comment.constructor === Object) {
                console.log("comment is empty!");
            } else {
                comment = <Comments commedtData={this.state.data.comment}/>
            }
        }

        return(
            <Aux>
                {comment}
            </Aux>
        )
    }
        
}    

export default view_Accommodation;