import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from "jquery";

class Header extends Component {
  constructor(props) {
    super(props);
    this.closePopover = this.closePopover.bind(this);
    this.state = {
      currentUser: this.props.currentUser,
      username: this.props.username
    }
  }
  

  closePopover() {
    this.setState({ popoverOpen: false })
  }

  render() {
    return (
      <div className="contenedor-nav">
        <nav className="navbar">
          <Link to="/home"><img className="icon" src="images/nav-ico.PNG"/></Link>
          <div className="d-flex justify-content-center h-100">
            {this.props.authenticated
              ?
                null
              :
                null
            }
          </div>
          {this.props.authenticated
            ?
              <div className='actions'>
                <Link to="/home"><img src="images/heart-icon.png"/></Link>
                <a href="#" className="dropbtn" onClick={
                  () => { $(".dropdown-content").slideToggle(); }
                }>
                  <img className="imageProfile" src="images/profile1.jpg"/>
                </a>
                <div className="dropdown-content" onClick={
                  () => { $(".dropdown-content").slideToggle(); }
                }>
                  <Link to="#"><span className="profileName">{this.state.username}</span></Link>
                  <hr/>
                  <Link to="/logout">Mi Perfil</Link>
                  <Link to="/profile">Configuración</Link>
                  <hr/>
                  <Link to="/logout">Cerrar Sesión</Link>
                </div>
              </div>
            :
              null
          }
        </nav>
      </div>
    );
  }
}

export default Header;
