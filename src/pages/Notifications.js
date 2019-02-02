import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Notifications extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      userMail: "",
      userName: this.props.username
    }
  }

  render() {
    return (
      <div className="NotificationsDiv">
        Notifications
        <div className="bottomMenu">
            <Link to="/home">
                <div className="buttonBottom">
                    <p> 
                        <img alt="" src="icons/general/homeicon.png" /> 
                    </p>
                </div>
            </Link>
            <Link to="/notifications">
                <div className="buttonBottom">
                    <p> 
                        <img alt="" src="icons/general/favoriteicon2.png" /> 
                    </p>
            </div>
            </Link>
            <Link to="/search">
                <div className="buttonBottom">
                    <p> 
                        <img alt="" src="icons/general/searchicon.png" /> 
                    </p>
                </div>
            </Link>
            <Link to={"/profile/"+this.state.userName}>
                <div className="buttonBottom">
                    <p> 
                        <img alt="" src="icons/general/profileicon.png" /> 
                    </p>
                </div>
            </Link>
        </div>
      </div>
    )
  }
}

export default Notifications;
