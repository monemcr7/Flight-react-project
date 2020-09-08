import React, {Component} from 'react';
// import { Route , useHistory } from 'react-router-dom';
import Aux from '../../hoc/Aux';
import $ from 'jquery'; 
class LoginForm extends Component {
    

    handelToValidate = () => {
        const { history } = this.props;
        var user_name = document.getElementById("userName").value;
        var password = document.getElementById("password").value;
        $(".text-alert").hide();
        var valid = true;
        if ( user_name == null || user_name == "" ){
            $(".text-alert").show();
            valid = false;
            console.log('text1')
        }
        if ( password == null || password == "" ){
            $(".text-alert").show();
            valid = false;
            console.log('text2')
        }
        if(valid){
            var form = new FormData($("#login_form")[0]);
            form.append("view_type","addtemplate");
            $.ajax({
                type: "POST",
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                url: 'https://flights.caduceuslane-digital.com/api/login',
                data: form,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    // var obj =  $.parseJSON(data);
                    console.log(data);
                    localStorage.setItem('token', data.access_token);
                    localStorage.setItem('level_id', data.level_id);
                    localStorage.setItem('image_profile', "https://flights.caduceuslane-digital.com/public/uploads/" +  data.image_profile);
                    localStorage.setItem('full_name', data.full_name);
                    localStorage.setItem('manager_id', data.manager_id);
                    
                    history.push("/My_requests");
                },
                error:function(data){
                    console.log("failed");
                }
                
    
            });
        }
    }

    
    onKeyDownHandler = e => {
        if (e.keyCode === 13) {
        this.handelToValidate();
        }
    };

    state = {  }
    render() { 
        return ( 
            <Aux>
                <section className="login">
                    <div className="container">
                        <div className="row h-100">
                        <div className="col-md-6 col-12 h-100 left-login">
                        <img src={require("../../assets/img/plan.png")} alt="plan"/>
                        </div> 
                            <div className="col-md-6 col-12 right-login">
                                <div className="logo text-center">
                                <img src={require("../../assets/img/new_logo.png")} alt="logo"/>
                                </div>
                                <form id="login_form" onKeyDown={this.onKeyDownHandler} name="login" action="">
                                <div className="form-group">
                                    <label htmlFor="userName">Email address</label>
                                    <input type="text" className="form-control" name="user_name" id="userName" aria-describedby="emailHelp" placeholder="Enter email"/>
                                    <span className="form-text text-alert">Check your email</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" id="password" placeholder="Password"/>
                                    <span className="form-text text-alert">Check your password</span>
                                </div>
                                <button type="button" className="btn btn-primary"  onClick={this.handelToValidate}>Sign in</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </Aux>
        );
    }
}



export default LoginForm;