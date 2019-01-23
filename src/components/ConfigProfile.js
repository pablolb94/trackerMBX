import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import $ from "jquery";

class ConfigProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      userMail: this.props.user.email,
      userName: this.props.username
    }
  }

  render() {
    return (
      <div className="configProfileDiv">
        <div className="configProfileBody">
          <div className="separatorProfileForms">
            <div className="titleSubConfProfile" onClick={
              ()=>{$(".changeData").slideToggle();}
            }>
              <p>Datos de Usuario</p>
            </div>
            <div className="formSubConfProfileForms changeData">
              <form action="/action_page.php">
                <div className="form-group">
                  <label for="username">Usuario:</label>
                  <input type="text" className="form-control" id="username" placeholder="Usuario" name="username" value={this.state.userName} disabled />
                </div>
                <div className="form-group">
                  <label for="email">Email:</label>
                  <input type="email" className="form-control" id="email" placeholder="Email" name="email" value={this.state.userMail} disabled />
                </div>
              </form>
            </div>
          </div>
          <div className="separatorProfileForms">
            <div className="titleSubConfProfile" onClick={
              ()=>{$(".changePassword").slideToggle();}
            }>
              <p>Cambiar Contraseña</p>
            </div>
            <div className="formSubConfProfileForms changePassword">
              <form action="/action_page.php">
                <div className="form-group">
                  <label for="password_new">Contraseña Nueva:</label>
                  <input type="password" className="form-control" id="password_new" placeholder="Contraseña Nueva" name="password_new" />
                </div>
                <div className="form-group">
                  <label for="password_old">Contraseña Antigua:</label>
                  <input type="password" className="form-control" id="password_old" placeholder="Contraseña Antigua" name="password_old" />
                </div>
                
                <button type="button" className="btn btn-info">Actualizar Contraseña</button>
              </form>
            </div>
          </div>
        </div>
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
            <Link to={"/profile/"+this.state.userName}>
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

export default ConfigProfile;
