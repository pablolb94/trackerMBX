import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var text = "nada";
    navigator.geolocation.getCurrentPosition(function() {
        console.log("Succesfully retreived our GPS position, we can now start our background tracker.");
    }, function(error) {
        console.error(error);
    });
    if(window.cordova){
        var text = "cordova";
    }
    else{
        var text = "no cordova";

    }
    return (
      <div className="homeDiv">
        <p> Home </p>
        <p>{text}</p>
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
