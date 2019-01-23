import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { app } from '../base';
import { Link } from 'react-router-dom';
import Alert from 'react-s-alert';

class Login extends Component {
  constructor(props) {
    super(props)
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
    this.state = {
      redirect: false
    }
  }

  authWithEmailPassword(event) {
    event.preventDefault()

    const email = this.emailInput.value
    const password = this.passwordInput.value
    
    app.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        return app.auth().signInWithEmailAndPassword(email, password)  
      })
      .then((user) => {
        if (user.user && user.user.email) {
          this.loginForm.reset()
          this.props.setCurrentUser(user.user)
          this.setState({redirect: true})      
        }
      })
      .catch((error) => {
        switch (error.message) {
          case "There is no user record corresponding to this identifier. The user may have been deleted.":
            Alert.warning("Error. Usuario no encontrado o eliminado.", {
              position: 'top',
              effect: 'genie',
            });
            break;
            case "The email address is badly formatted.":
            Alert.warning("Error. Email Incorrecto / Mal formado.", {
              position: 'top',
              effect: 'genie',
            });
            break;
          case "The password is invalid or the user does not have a password.":
            Alert.warning("Error. Usuario / Contraseña incorrectos.", {
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
  }

  render() {
    if (this.props.redirect) {
      return <Redirect to={"Home"} />
    }else{
      return (
        <div className="logInDiv">
        
          <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
            <div className="form-group">
              <label for="email">Email</label>
              <input type="email" name="email" className="form-control" id="email" ref={(input) => { this.emailInput = input }} aria-describedby="email" placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-muted">Introduzca un email de acceso.</small>
            </div>
            <div className="form-group">
              <label for="password">Contraseña</label>
              <input type="password" className="form-control" id="password" name="password" aria-describedby="password" placeholder="Enter password" ref={(input) => { this.passwordInput = input }} />
              <small id="emailHelp" className="form-text text-muted">Introduzca una contraseña de acceso.</small>
            </div>
            <br/>
            <input type="submit" className="btn btn-info" value="Iniciar Sesión"></input>
            <br/>
            <Link to="/logUp">
              <br/>
              <p className="registerText">¿No tienes cuenta? - Registrate aquí</p>
            </Link>

          </form>
        </div>
      )
    }
  }
}

export default Login;
