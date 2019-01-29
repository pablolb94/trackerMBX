import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import ConfigProfileBody from './../components/configProfile/ConfigProfileBody.js';
import $ from "jquery";


class ConfigProfile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="configProfileDiv">
        <ConfigProfileBody 
            account={this.props.account}
            accounts={this.props.accounts}
            user={this.props.user} 
            udateImageProfile={this.props.udateImageProfile} />
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
                        <img alt="" src="icons/general/favoriteicon.png" /> 
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
            <Link to={"/profile/"+this.props.account.username}>
                <div className="buttonBottom">
                    <p> 
                        <img alt="" src="icons/general/profileicon2.png" /> 
                    </p>
                </div>
            </Link>
        </div>
      </div>
    )
  }
}

export default ConfigProfile;
