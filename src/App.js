import React, { Component } from 'react';
import { BrowserRouter,HashRouter, Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import { app, base } from './base';
import createHashHistory from "history/createHashHistory";

import "./styles/styles.css";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

import Alert from 'react-s-alert';

import Header from './components/Header';
import Login from './components/Login';
import Logout from './components/Logout';
import NoMatch from './components/404.js';
import LogUp from './components/LogUp.js';

//PAGES
import Home from './pages/Home.js';
import Notifications from './pages/Notifications.js';
import Search from './pages/Search.js';
import Profile from './pages/Profile.js';
import ConfigProfile from './pages/ConfigProfile.js';

let history = createHashHistory();

//FUNCION PARA RESTRINGIR PAGINAS QUE REQUIEREN DE LOGIN
function AuthenticatedRoute({component: Component, authenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
          ? <Component {...props} {...rest} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} /> } />
  )
}

class App extends Component {
  constructor() {
    super();
    this.setCurrentUser = this.setCurrentUser.bind(this); //METODO PARA ACTUALIZAR DATOS DE LA SESION.
    this.addAccount = this.addAccount.bind(this);         //METODO PARA CREAR CUENTA.
    this.updateStateAll = this.updateStateAll.bind(this); //
    this.updateFollow = this.updateFollow.bind(this);     //METODO PARA ACTUALIZAR SEGUIDORES.
    this.udateImageProfile = this.udateImageProfile.bind(this);     //METODO PARA ACTUALIZAR FOTO DE PERFIL.
    this.state = {
      authenticated: false,   //VARIABLE QUE DEFINE SI ESTA LOGEADO O NO.
      currentUser: null,      //USUARIO.
      loading: true,          //MUESTRA O OCULTA EL LOADING PAGE.
      accounts: {},           //COLECCION DE CUENTAS.
      account: ""             //CUENTA CON LA QUE ESTA LOGUEADO.
    };
  }

  //METODOS PARA CONECTAR CON LA BD.
  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
        })

      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false,
        })
      }
    })
  }

  componentDidMount(){
    this.db = app.database().ref().child('accounts');
    const { accounts } = this.state;
    this.db.on('child_added', snap => {
      var entry = snap.val();
      accounts[snap.key] = (entry);
      this.setState({ accounts });
      if(this.state.currentUser){
        if(this.state.currentUser.uid == snap.val().id){
          this.setState({account:snap.val(), loading: false });
        }
      }
    })
  }

  
  setCurrentUser(user) {
    if (user) {
      var account = new Object;
      for (var key in this.state.accounts) {
        if (this.state.accounts.hasOwnProperty(key)) {
          if(user.uid == this.state.accounts[key].id){
            account = this.state.accounts[key];
            //console.log(this.state)
          }
        }
      }
      this.setState({
        currentUser: user,
        authenticated: true,
        account: account,
      })
    } else {
      this.setState({
        currentUser: null,
        authenticated: false,
        account: ""
      })
    }
  }

  addAccount(account) {
    const accounts = {...this.state.accounts};
    this.db.push().set(account);
  }

  updateStateAll(accounts, account){
    this.setState({account, accounts});
  }

  updateFollow(accountId, addFollow) {
    var db = app.database();
    var accounts = this.state.accounts;
    var account = this.state.account;
    var keyLocal = "";
    if(addFollow){  //COMENZAR A SEGUIR
      for (var key in accounts) {
        if (accounts.hasOwnProperty(key)) {
          if(accounts[key].id == account.id){
            keyLocal = key;
          }
          if(accounts[key].id == accountId){
            if(accounts[key].followers){
              accounts[key].followers.push(account.id)
            }else{
              var arr = new Array();
              arr.push(account.id);
              accounts[key].followers = arr;
            }
            db.ref("accounts/"+key+"/followers").set(accounts[key].followers);
          }
        }
      }
      if(account.following){
        account.following.push(accountId);
      }else{
        var arr = new Array();
        arr.push(accountId);
        account.following = arr;
      }
      db.ref("accounts/"+keyLocal+"/following").set(account.following);
      this.setState({accounts, account})
    }else{          //DEJAR DE SEGUIR
      //ELIMINA SEGUIDOR DEL USUARIO
      for (var key in accounts) {
        if (accounts.hasOwnProperty(key)) {
          if(accounts[key].id == account.id){
            keyLocal = key;
          }
          if(accounts[key].id == accountId){
            var memory = 0;
            accounts[key].followers.forEach(element => {
              if(element == account.id){
                accounts[key].followers.splice(memory, 1);
                db.ref("accounts/"+key+"/followers").set(accounts[key].followers);
              }
              memory ++;
            });
          }
        }
      }
      //ELIMINA SIGUIENDO DEL USUARIO LOGUEADO
      var memory = 0;
      account.following.forEach(element => {
        if(element == accountId){
          account.following.splice( memory , 1);
          db.ref("accounts/"+keyLocal+"/following").set(account.following);
        }
        memory++;
      });
      
      //ACTUALIZA LAS PROPIEDADES.
      this.setState({accounts, account})
    }
  }

  udateImageProfile(accountKey, imageB64){
    var accounts = this.state.accounts;
    var account = this.state.account;
    var db = app.database();
    db.ref("accounts/"+accountKey+"/image").set(imageB64);
    account.image = imageB64;
    accounts[accountKey].image = imageB64;
    this.setState({ account, accounts});
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div className="LoadingDiv">
          <img src="images/nav-ico.PNG" />
        </div>
      )
    }
    return (
      <div className="contenedor">
      <Alert stack={{limit: 3}} />
        <HashRouter history={history}>  
          <div>
            <Header 
              authenticated={this.state.authenticated} 
              currentUser={this.state.currentUser} 
            />
            <Switch>
              <AuthenticatedRoute
                exact
                path="/"
                authenticated={false}
                component={Login}
              />
              <AuthenticatedRoute
                exact
                path="/home"
                authenticated={this.state.authenticated}
                component={Home}
                account={this.state.account}
              />
              <AuthenticatedRoute
                exact
                path="/search"
                authenticated={this.state.authenticated}
                component={Search}
                account={this.state.account}
                accounts={this.state.accounts}
                updateFollow={this.updateFollow}
              />
              <AuthenticatedRoute
                exact
                path="/Profile/:username"
                authenticated={this.state.authenticated}
                component={Profile}
                accounts={this.state.accounts}
                account={this.state.account}
                updateFollow={this.updateFollow}
              />
              <AuthenticatedRoute
                exact
                path="/Notifications"
                authenticated={this.state.authenticated}
                component={Notifications}
              />
              <AuthenticatedRoute
                exact
                path="/Configprofile"
                authenticated={this.state.authenticated}
                component={ConfigProfile}
                accounts={this.state.accounts}
                account={this.state.account}
                user={this.state.currentUser}
                udateImageProfile={this.udateImageProfile}
              />
              <Route path="/logout" component={Logout} />
              <Route path="/login" render={(props) => {
                return <Login redirect={this.state.currentUser} setCurrentUser={this.setCurrentUser} {...props} />
                }
              } />
              <Route path="/logup" render={(props) => {
                return <LogUp accounts={this.state.accounts} redirect={this.state.currentUser} addAccount={this.addAccount} setCurrentUser={this.setCurrentUser} {...props} />
                }
              } />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
