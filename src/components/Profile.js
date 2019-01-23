import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { app, base } from './../base';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.updateUnfollow = this.updateUnfollow.bind(this);
    this.updateFollow = this.updateFollow.bind(this);
    this.state = {
      user: this.props.user,
      userMail: this.props.user.email,
      userName: this.props.username,
      accounts: this.props.accounts,
      account: this.props.account,
      account2: {},
      loading: true,
    }
  }

  updateUnfollow(event, userNameBase){
    var db = app.database();
    var accounts = this.state.accounts;
    var idFollower = this.state.account.id;
    var idBase = -1;

    for (var key in accounts) {
        if (accounts.hasOwnProperty(key)) {
            if(accounts[key].username == userNameBase){
                idBase = accounts[key].id;
                var cont = 0;
                accounts[key].followers.forEach(element => {
                    if(element == idFollower){
                        accounts[key].followers.splice(cont, 1);
                        db.ref("accounts/"+key+"/followers").set(accounts[key].followers);
                    }
                    cont++;
                });
                this.setState({accounts})
            }
        }
    }
    for (var key in accounts) {
        if (accounts.hasOwnProperty(key)) {
            if(accounts[key].username == this.props.account.username){
                var cont = 0;
                accounts[key].following.forEach(element => {
                    if(element == idBase){
                        accounts[key].following.splice(cont, 1);
                        db.ref("accounts/"+key+"/following").set(accounts[key].following);
                    }
                    cont++;
                });
                this.setState({accounts, account: accounts[key]})
                this.props.updateStateAll(accounts, accounts[key]);
            }
        }
    }
  }

  updateFollow(event, userNameBase){
    const accounts = {...this.state.accounts};
    const account = {...this.state.account};
    var db = app.database();
    var following = new Array();
    var idAccount2 = "";
    for (var key in accounts) {
        if (accounts.hasOwnProperty(key)) {
            if(userNameBase == accounts[key].username){
                idAccount2 = accounts[key].id;
                if(accounts[key].followers!=undefined){
                    var clave = accounts[key].followers.length;
                    accounts[key].followers.push(this.state.account.id)
                }else{
                    var clave = 0;
                    var arrM = new Array();
                    arrM.push(this.state.account.id)
                    accounts[key].followers = arrM;
                }
                db.ref("accounts/"+key+"/followers/"+clave).set(this.state.account.id);
                this.setState({accounts})
                this.props.updateStateAll(accounts);
            }
        }
    }
    for (var key in accounts) {
        if (accounts.hasOwnProperty(key)) {
            if(account.username == accounts[key].username){
                var accountM = accounts[key];
                if(accountM.following==undefined){
                    var clave = 0;
                    var arrM = new Array();
                    arrM.push(idAccount2)
                    accountM.following = arrM;
                }else{
                    var clave = accountM.following.length;
                    accountM.following.push(idAccount2)
                }
                accounts[key] = accountM;
                
                db.ref("accounts/"+key+"/following/"+clave).set(idAccount2);
                this.setState({accounts, account:accountM})
                this.props.updateStateAll(accounts, accountM);
            }
        }
    }
    //this.props.updateFollow(this.state.account, account2);
  }

  render() {
    if(this.props.match.params.username != this.state.userName){
        var account = new Object;
        
        for (var key in this.state.accounts) {
            if (this.state.accounts.hasOwnProperty(key)) {
                if(this.props.match.params.username == this.state.accounts[key].username){
                    account = this.state.accounts[key];
                }
            }
        }

        var following = false;

        if(this.state.account.following){
            this.state.account.following.forEach(element => {
                if(element==account.id){
                    following = true;
                }
            });
        }
        
        return (
        <div className="profileDiv">
            <div className="headerProfile">
                <div className="profileImg">
                    <img src="images/profile1.jpg" />
                </div>
                <div className="profileDesc">
                    <p>{account.username}</p>
                    {
                        following ?
                        (
                            <form onSubmit={(event) => { this.updateUnfollow(event, account.username) }} ref={(form) => { this.unfollowForm = form }}>
                                <input type="submit" className="btn btn-warning configUserBtn" id="test" value="Dejar de seguir"></input>
                            </form>
                        ) : 
                        (
                            <form onSubmit={(event) => { this.updateFollow(event, account.username) }} ref={(form) => { this.followForm = form }}>
                                <input type="submit" className="btn btn-success configUserBtn" value="Comenzar a seguir"></input>
                            </form>
                        )
                    }
                </div>
            </div>
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
            <div className="bottomMenu">
                <Link to="/home">
                    <div className="buttonBottom">
                        <p> 
                            <img src="icons/general/homeicon.png" /> 
                        </p>
                    </div>
                </Link>
                <Link to="/notifications">
                    <div className="buttonBottom">
                        <p> 
                            <img src="icons/general/favoriteicon.png" /> 
                        </p>
                </div>
                </Link>
                <Link to="/search">
                    <div className="buttonBottom">
                        <p> 
                            <img src="icons/general/searchicon.png" /> 
                        </p>
                    </div>
                </Link>
                <Link to={"/profile/"+this.state.userName}>
                    <div className="buttonBottom">
                        <p> 
                            <img src="icons/general/profileicon.png" /> 
                        </p>
                    </div>
                </Link>
            </div>
        </div>
        )
    }else{
        return (
        <div className="profileDiv">
            <div className="headerProfile">
                <div className="profileImg">
                    <img src="images/profile1.jpg" />
                </div>
                <div className="profileDesc">
                    <p>{this.state.account.username}</p>
                    <Link to="/configprofile"><div className="btn btn-info configUserBtn">Configuración</div></Link>
                    <Link to="/logout"><div className="btn btn-info closeSessionBtn"><img src="icons/general/closeSessionIcon.png" /></div></Link>
                </div>
            </div>
            <div className="profileInfoFollow">
                <div>
                <span className="low">Rutas:<br/></span>
                    <span className="big">12 {this.state.account.tracks}</span>
                </div>
                <div>
                    <span className="low">Seguidores:<br/></span>
                    <span className="big">{this.state.account.followers==undefined ? (0) : (this.state.account.followers.length)}</span>
                </div>
                <div className="lastFollowDiv">
                    <span className="low">Seguidos:<br/></span>
                    <span className="big">{this.state.account.following==undefined ? (0) : (this.state.account.following.length)}</span>
                </div>
            </div>
            <div className="bottomMenu">
                <Link to="/home">
                    <div className="buttonBottom">
                        <p> 
                            <img src="icons/general/homeicon.png" /> 
                        </p>
                    </div>
                </Link>
                <Link to="/notifications">
                    <div className="buttonBottom">
                        <p> 
                            <img src="icons/general/favoriteicon.png" /> 
                        </p>
                </div>
                </Link>
                <Link to="/search">
                    <div className="buttonBottom">
                        <p> 
                            <img src="icons/general/searchicon.png" /> 
                        </p>
                    </div>
                </Link>
                <Link to={"/profile/"+this.state.userName}>
                    <div className="buttonBottom">
                        <p> 
                            <img src="icons/general/profileicon2.png" /> 
                        </p>
                    </div>
                </Link>
            </div>
        </div>
        )
    }
  }
}

export default Profile;
