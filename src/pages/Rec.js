import React, { Component } from 'react';
import { Linkn, Redirect } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state= {
        stateRoute: "Sin estado.",
        redirect: false,
        route: {},
        coordinates:[],
        refreshIntervalId: ""
    }
    this.pauseRoute=this.pauseRoute.bind(this);
    this.rectRoute=this.rectRoute.bind(this);
    
  }

  pauseRoute(){
    this.setState({stateRoute:"En Pausa."});
    clearInterval(this.state.refreshIntervalId);
    console.log(this.state.coordinates)
  }

  stopRoute(){
    this.setState({ruote: {
      type: "FeatureCollection",
      "features": [
        { 
          "type": "Feature",
          "geometry": {
            "type": "LineString",
            'coordinates':[]
          }
        },
      ]
    }});
    this.setState({ redirect: true});
  }

  uploadRoute(){
    this.setState({stateRoute:"Sin estado."});
  }

  render() {
    if(this.state.redirect){
      return (
        <Redirect to={{pathname: '/login'}} />
      )
    }else{
      return (
        <div className="rectDiv">
          <div className="infoDiv">
              <p className="alert alert-warning">Estas grabando una nueva ruta, no salgas de la aplicación hasta acabar o perderas 
                  los datos almacenados!.<br/><br/>
                  Usa los controles para Pausar/Iniciar/Deneter o Almacenar tu ruta.
              </p>
          </div>

          <div className="statusRect">
              <h4>Estado de tu ruta: <span> {this.state.stateRoute} </span></h4>
          </div>

          <div className="controlsMenu">
              {
                this.state.stateRoute =="Grabando."?
                  (<span className="glyphicon glyphicon-pause"  onClick={evt => this.pauseRoute()}></span>)
                :
                  (<span className="glyphicon glyphicon-play" onClick={evt => this.rectRoute()}></span>)

              }
              <span className="glyphicon glyphicon-stop" onClick={evt => this.stopRoute()}></span> 
              <span className="glyphicon glyphicon-upload" onClick={evt => this.uploadRoute()}></span> 
              
          </div>

          <div className="infoDiv">
              <div className="alert alert-warning">
                  <span className="glyphicon glyphicon-pause"></span> &nbsp;
                  Usa este boton para pausar tu ruta. <br/><br/>
                  <span className="glyphicon glyphicon-play"></span> &nbsp;
                  Usa este boton para continuar con tu ruta o comenzar a grabarla. <br/><br/>
                  <span className="glyphicon glyphicon-stop"></span> &nbsp;
                  Usa este boton para salir sin guardar tu ruta. <br/><br/>
                  <span className="glyphicon glyphicon-upload"></span> &nbsp;
                  Usa este boton para guardar tu ruta. (debe estar pausada).
              </div>
          </div>
        </div>
      );
    }
  }
}

export default Home;
