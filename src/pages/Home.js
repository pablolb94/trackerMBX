import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="homeDiv">
        <p> Home </p>
        <div className="bottomMenu">
            <Link to="/home">
                <div className="buttonBottom">
                    <p> 
                        <img src="icons/general/homeicon2.png" /> 
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
    );
  }
}

export default Home;
