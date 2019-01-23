import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class searchDiv extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      userName: this.props.username,
      accounts: this.props.accounts,
      account: this.props.account,
      searchFilter: ""
    }
  }

  updateSearchFilter(evt){
    this.setState({
        searchFilter: evt.target.value
    });
  }

  render() {
    var usernameMem = this.state.account.username;
    var accounts = this.state.accounts;
    var accountMem = new Array();

    if(this.state.searchFilter){
        var memory = this.state.searchFilter;
        Object.keys(accounts).map(function(key) {
            if(accounts[key].username.toUpperCase().includes(memory.toUpperCase())){
                accountMem.push(accounts[key]);
            }
        });
        accounts = accountMem;
    }

    if(Object.keys(accounts).length>0){
        return (
        <div className="searchContent">
            <div className="searchHeader">
                <div className="searchbar">
                    <input className="search_input" type="text" onChange={evt => this.updateSearchFilter(evt)} placeholder="Busqueda" />
                </div>
            </div>
            <div className="searchBody">
                {
                    Object.keys(accounts).map(function(key) {
                        var cont=0;
                        cont++;
                        if(accounts[key].username == usernameMem){
                            return ;
                        }else{
                            return (
                                <div className="objectProfileSearch">
                                    <div className="imageProfileSearch">
                                        <img src="images/profile1.jpg" />
                                    </div>
                                    <div className="describeProfileSearch">
                                        <Link to={"/profile/"+accounts[key].username}>
                                            {accounts[key].username}
                                        </Link>
                                    </div>
                                    <div className="followBtnSearch">
                                        <Link to={"/profile/"+accounts[key].username}>
                                            <div className="btn btn-info followSearhBtn">Visitar Perfil</div>
                                        </Link>                            
                                    </div>
                                </div>
                            )
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
            <div className="searchContent">
                <div className="searchHeader">
                    <div className="searchbar">
                        <input className="search_input" type="text" onChange={evt => this.updateSearchFilter(evt)} placeholder="Busqueda" />
                    </div>
                </div>
                <div className="searchBodyNone">
                    <p>No hemos encontrado resultados.. :(</p>
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
    }
  }
}

export default searchDiv;
