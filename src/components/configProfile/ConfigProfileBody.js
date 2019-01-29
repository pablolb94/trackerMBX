import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { app, base } from './../../base';
import $ from "jquery";
import FileBase64 from 'react-file-base64';

class ConfigProfileBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
        image: [],
    }
  }

  getFiles(files){
    this.setState({ image: files[0].base64 })
    const accounts = {...this.props.accounts};
    const account = {...this.props.account};
    
    var db = app.database();
    for (var key in accounts) {
      if (accounts.hasOwnProperty(key)) {
        if(accounts[key].username == account.username){
            this.props.udateImageProfile(key, this.state.image);
        }
      }
    }
    $(".uploadImageDiv").html("<p>Imagen actualizada con exito. <span class='glyphicon glyphicon glyphicon-ok'></span></p>")
  }

  render() {
    return (
        <div className="configProfileBody">
          <div className="separatorProfileForms">
            <div className="titleSubConfProfile" onClick={
              ()=>{$(".changeData").slideToggle();}
            }>
              <p>Datos de Usuario</p>
            </div>
            <div className="formSubConfProfileForms changeData">
              <div className="form-group">
                <label for="username">Usuario:</label>
                <input type="text" className="form-control" id="username" placeholder="Usuario" name="username" value={this.props.account.username} disabled />
              </div>
              <div className="form-group">
                <label for="email">Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Email" name="email" value={this.props.user.email} disabled />
              </div>
            </div>
          </div>
          <div className="separatorProfileForms">
            <div className="titleSubConfProfile" onClick={
              ()=>{$(".uploadImageDiv").slideToggle();}
            }>
              <p>Foto de Perfil</p>
            </div>
            <div className="formSubConfProfileForms uploadImageDiv">
              <FileBase64
                multiple={ true }
                onDone={ this.getFiles.bind(this) }
              />
            </div>
          </div>
          <div className="separatorProfileForms">
            <div className="titleSubConfProfile" onClick={
              ()=>{$(".changePassword").slideToggle();}
            }>
              <p>Cambiar Contraseña</p>
            </div>
            <div className="formSubConfProfileForms changePassword">
              <div className="form-group">
                <label for="password_new">Contraseña Antigua:</label>
                <input type="password" className="form-control" id="password_new" placeholder="Contraseña Antigua" name="password_new" />
              </div>
              <div className="form-group">
                <label for="password_old">Contraseña Nueva:</label>
                <input type="password" className="form-control" id="password_old" placeholder="Contraseña Nueva" name="password_old" />
              </div>                
              <button type="button" className="btn btn-info">Actualizar Contraseña</button>
            </div>
          </div>
        </div>
    )
  }
}

export default ConfigProfileBody;
