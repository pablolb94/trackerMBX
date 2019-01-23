import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import Alert from 'react-s-alert';

class LogUp extends Component {
  constructor(props) {
    super(props)
    this.registredAccount = this.registredAccount.bind(this)
    this.state = {
      redirect: false,
      accounts: props.accounts
    }
  }

  registredAccount(event) {
    event.preventDefault()

    const email = this.emailInput.value
    const password = this.passwordInput.value
    const username = this.usernameImput.value
    var found=false;

    for (var key in this.state.accounts) {
      if (this.state.accounts.hasOwnProperty(key)) {
          if(username.toUpperCase() == this.state.accounts[key].username.toUpperCase()){
            found=true;
          }
      }
    }

    if(found){
      Alert.warning("Error. El nombre de usuario ya se encuentra en uso.", {
        position: 'top',
        effect: 'genie',
      });
    }
    else if(email && username && password){
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((authData) => {
          if (authData.user && authData.user.email) {
            const account = {
              id: authData.user.uid,
              username: username,
            }
            this.props.addAccount(account);
            this.logUpForm.reset();
            this.props.setCurrentUser(authData.user);
            this.setState({redirect: true});
          }
        })
        .catch((error) => {
            switch (error.message) {
            case "The email address is already in use by another account.":
                Alert.warning("Error. El Email introducido ya se encuentra registrado.", {
                  position: 'top',
                  effect: 'genie',
                });
                break;
                case "The email address is badly formatted.":
                Alert.warning("Error. Email incorrecto.", {
                  position: 'top',
                  effect: 'genie',
                });
                break;
            case "The password is invalid or the user does not have a password.":
                Alert.warning("Error. Usuario no encontrado o eliminado.", {
                  position: 'top',
                  effect: 'genie',
                });
                break;
            case "Password should be at least 6 characters":
                Alert.warning("Error. La contraseña no cumple los requisitos.", {
                  position: 'top',
                  effect: 'genie',
                }); 
                break;
            
            default:
                Alert.warning(error.message, {
                  position: 'top',
                  effect: 'genie',
                });
                break;
            }
        })

    }else{
      Alert.warning("Error. Debes rellenar todos los campos.", {
        position: 'top',
        effect: 'genie',
      });
    }
  }

  render() {
    if (this.state.redirect) {
        return <Redirect to={"home"} />
    }
    console.log(this.state.accounts)

    return (
      <div className="logUpDiv">
        <form onSubmit={(event) => { this.registredAccount(event) }} ref={(form) => { this.logUpForm = form }}>
          <div className="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" className="form-control" id="email" ref={(input) => { this.emailInput = input }} aria-describedby="email" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">Introduzca un email valido.</small>
          </div>
          <div className="form-group" id="usernameDiv">
            <label for="username">Usuario</label>
            <input type="text" name="username" className="form-control" id="username" ref={(input) => { this.usernameImput = input }} placeholder="Usuario" />
            <small id="emailHelp" className="form-text text-muted">Introduzca un usuario.</small>
          </div>
          <div className="form-group">
            <label for="password">Contraseña</label>
            <input type="password" className="form-control" id="password" name="password" aria-describedby="password" placeholder="Enter password" ref={(input) => { this.passwordInput = input }} />
            <small id="emailHelp" className="form-text text-muted">Introduzca una contraseña (mínimo 6 caracters).</small>
          </div>
          <br/>
          <input type="submit" className="btn btn-info" value="Crear Cuenta"></input>
          <br/>
          <Link to="/login">
            <br/>
            <p className="registerText">Volver</p>
          </Link>

        </form>
      </div>
    )
  }
}

export default LogUp;
