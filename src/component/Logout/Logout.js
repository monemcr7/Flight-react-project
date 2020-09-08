import React, {Component} from 'react';
import  { Redirect } from 'react-router-dom';
import $ from 'jquery'; 
class Logout extends Component {

    state = {
        navigate: false
      };

      logout = () => {
          localStorage.clear("token");
          this.setState({navigate: true});
          console.log("Successfully Logout");
      };

    render() { 
        const { navigate } = this.state;

        if (navigate) {
            return <Redirect to='/' push={true} />
        }
        return <a onClick={this.logout} className="nav-link"> <i className="fa fa-power-off icon-links" aria-hidden="true"></i></a>
    }
}
 
export default Logout;