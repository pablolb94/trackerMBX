import React, { Component } from 'react';
import { BrowserRouter,HashRouter, Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import { app, base } from './base';
import createHashHistory from "history/createHashHistory";

import "./styles/styles.css";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

import Alert from 'react-s-alert';

import Header from './components/Header';
import Home from './components/Home.js';
import Login from './components/Login';
import Logout from './components/Logout';
import NoMatch from './components/404.js';
import LogUp from './components/LogUp.js';
import Profile from './components/Profile.js';
import Search from './components/Search.js';
import Notifications from './components/Notifications.js';
import ConfigProfile from './components/ConfigProfile.js';

let history = createHashHistory();

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
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.addAccount = this.addAccount.bind(this);
    this.updateStateAll = this.updateStateAll.bind(this);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true,
      accounts: {},
      username: "",
      account: ""
    };
  }

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
          this.setState({ username: snap.val().username, account:snap.val(), loading: false });
        }
      }
    })
  }

  addAccount(account) {
    const accounts = {...this.state.accounts};
    this.db.push().set(account);
  }

  updateStateAll(accounts, account){
    this.setState({account, accounts});
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
        username: account.username
      })
    } else {
      this.setState({
        currentUser: null,
        authenticated: false,
        username: ""
      })
    }
  }


  render() {
    if (this.state.loading === true) {
      return (
        <div className="LoadingDiv">
          <img src="images/loading.gif" />
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
              username={this.state.username}
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
                username={this.state.username}
              />
              <AuthenticatedRoute
                exact
                path="/search"
                authenticated={this.state.authenticated}
                component={Search}
                user={this.state.currentUser}
                username={this.state.username}
                account={this.state.account}
                accounts={this.state.accounts}
              />
              <AuthenticatedRoute
                exact
                path="/Profile/:username"
                authenticated={this.state.authenticated}
                component={Profile}
                user={this.state.currentUser}
                accounts={this.state.accounts}
                account={this.state.account}
                username={this.state.username}
                updateStateAll={this.updateStateAll}
              />
              <AuthenticatedRoute
                exact
                path="/Notifications"
                authenticated={this.state.authenticated}
                component={Notifications}
                user={this.state.currentUser}
                username={this.state.username}
              />
              <AuthenticatedRoute
                exact
                path="/Configprofile"
                authenticated={this.state.authenticated}
                component={ConfigProfile}
                user={this.state.currentUser}
                username={this.state.username}
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
