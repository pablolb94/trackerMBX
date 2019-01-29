import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Followers extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var account = this.props.account;
    return (
        <div className="profileInfoFollow">
            <div>
                <span className="low">Rutas:<br/></span>
                <span className="big">12 {account.tracks}</span>
            </div>
            <div>
                <span className="low">Seguidores:<br/></span>
                <span className="big">{account.followers == undefined ? (0) : (account.followers.length)}</span>
            </div>
            <div className="lastFollowDiv">
                <span className="low">Seguidos:<br/></span>
                <span className="big">{account.following == undefined ? (0) : (account.following.length)}</span>
            </div>
        </div>
    )
  }
}

export default Followers;
