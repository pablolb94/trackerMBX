import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import SearchHeader from "./../components/search/SearchHeader.js";
import ObjectProfileSearch from "./../components/search/ObjectProfileSearch.js";

class searchDiv extends Component {
  constructor(props) {
    super(props);
    this.updateSearchFilter = this.updateSearchFilter.bind(this);
    this.state = {
      filters: ""
    }
  }

  updateSearchFilter(evt){
    this.setState({
        filters: evt.target.value
    });
  }

  render() {
    var accounts = this.props.accounts;
    var account = this.props.account;
    var updateFollow = this.props.updateFollow;
    var accountMem = new Array();

    if(this.state.filters){
      var memory = this.state.filters;
      Object.keys(accounts).map(function(key) {
          if(accounts[key].username.toUpperCase().includes(memory.toUpperCase())){
              accountMem.push(accounts[key]);
          }
      });
      accounts = accountMem;
    }
    
    return(
      <div className="searchContent">
        <SearchHeader filters={this.state.filters} updateSearchFilter={this.updateSearchFilter} />
        <div className="searchBody">
          {
            Object.keys(accounts).map(function(key, e, i) {
              if(accounts[key].username == account.username){
                return ("");
              }else{
                var following = false;
                if(account.following){
                  account.following.forEach(element => {
                    if(element == accounts[key].id){
                      following = true;
                    }
                  });
                }
                return (<ObjectProfileSearch updateFollow={updateFollow} account={accounts[key]} following={following} />)
              }
            })
          }
          <hr/>
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
          <Link to={"/profile/"+this.props.account.username}>
            <div className="buttonBottom">
              <p> 
                <img src="icons/general/profileicon.png" /> 
              </p>
            </div>
          </Link>
        </div>
      </div>
    ) 
  }
}

export default searchDiv;
