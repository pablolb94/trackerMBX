import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Followers extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var account = this.props.account;
    var tracks = this.props.tracks;
    var cont = 0;
    for (var key in tracks) {
        if (tracks.hasOwnProperty(key)) {
            if(tracks[key].owner == account.id){
                cont++;
            }
        }
    }
    return (
        <div className="profileInfoFollow">
            <div>
                <span className="low">Rutas:<br/></span>
                <span className="big">{cont}</span>
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
