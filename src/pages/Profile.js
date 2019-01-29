import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import HeaderProfileOwn from "./../components/profile/HeaderProfileOwn.js";
import HeaderProfile from "./../components/profile/HeaderProfile.js";
import Followers from '../components/profile/Followers';
import SimpleExample from '../components/testMap.js';

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var account="";

    for (var key in this.props.accounts) {
        if (this.props.accounts.hasOwnProperty(key)) {
            if(this.props.match.params.username  == this.props.accounts[key].username){
                account = this.props.accounts[key];
            }
        }
    }

    return (
        <div className="profileDiv">
            {
                this.props.match.params.username == this.props.account.username ?
                    (<HeaderProfileOwn account={this.props.account} />)
                : 
                    (<HeaderProfile account={account} account2={this.props.account} updateFollow={this.props.updateFollow} />)
            }
            {
                this.props.match.params.username == this.props.account.username ?
                    (<Followers account={this.props.account} />)
                :
                    (<Followers account={account} />)
            }  
            
            <SimpleExample />

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

export default Profile;