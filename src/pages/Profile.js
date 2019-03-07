import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import HeaderProfileOwn from "./../components/profile/HeaderProfileOwn.js";
import HeaderProfile from "./../components/profile/HeaderProfile.js";
import Followers from '../components/profile/Followers';
import PublicationProfile from '../components/publication/PublicationProfile.js';
import SimpleExample from '../components/testMap.js';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.updateIdRouteCRUD = this.updateIdRouteCRUD.bind(this);
    this.state = {
        idRoute: "0"
    }
  }

  updateIdRouteCRUD(idRoute){
    this.setState({
        idRoute: idRoute,
    })
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

    var data = this.props.tracks[0];

    var tracks=new Array();
    for (var key in this.props.tracks) {
        if (this.props.tracks.hasOwnProperty(key)) {
            if(account.id  == this.props.tracks[key].owner){
                var trackMem = this.props.tracks[key];
                tracks.push(trackMem)
            }
        }
    }

    var thisMem = this;

    return (
        <div className="profileDiv">
            <div class="modal fade" id="delRouteModal" role="dialog">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Eliminar Ruta</h4>
                    </div>
                    <div class="modal-body">
                        <p>¿Seguro que deseas eliminar esta ruta?.</p>
                        <p>{thisMem.state.idRoute}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                        <button type="button" onClick={function(){thisMem.props.deleteTrack(thisMem.state.idRoute)}} class="btn btn-danger" data-dismiss="modal">Eliminar</button>
                    </div>
                </div>
                
                </div>
            </div>
            {
                this.props.match.params.username == this.props.account.username ?
                    (<HeaderProfileOwn account={this.props.account} />)
                : 
                    (<HeaderProfile account={account} account2={this.props.account} updateFollow={this.props.updateFollow} />)
            }
            {
                this.props.match.params.username == this.props.account.username ?
                    (<Followers account={this.props.account} tracks={this.props.tracks} />)
                :
                    (<Followers account={account} tracks={this.props.tracks} />)
            }
            {
                Object.keys(tracks).map(function(key, e, i) {
                    return (<PublicationProfile track={tracks[key]} account={account} updateIdRouteCRUD={thisMem.updateIdRouteCRUD} />)
                })
            }

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