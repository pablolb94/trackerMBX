import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HeaderProfile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var following = false;

    if(this.props.account2.following){
        this.props.account2.following.forEach(element => {
            if(element==this.props.account.id){
                following = true;
            }
        });
    } 

    return (
        <div className="headerProfile">
            <div className="profileImg">
                <img src={
                    this.props.account.image ?
                        (this.props.account.image)
                    :
                        ("images/profile1.jpg")
                } />
            </div>
            <div className="profileDesc">
                <p>{this.props.account.username}</p>
                {
                    following ?
                    (
                        <input onClick={() => {this.props.updateFollow( this.props.account.id, false)}} type="submit" className="btn btn-warning configUserBtn" id="test" value="Dejar de seguir"></input>
                    ) : 
                    (
                        <input onClick={() => {this.props.updateFollow( this.props.account.id, true)}} type="submit" className="btn btn-success configUserBtn" value="Comenzar a seguir"></input>
                    )
                }
            </div>
        </div>
    )
  }
}

export default HeaderProfile;
