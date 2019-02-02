import React, { Component } from 'react';
import { Linkn, Redirect } from 'react-router-dom';

import mapboxgl from 'mapbox-gl'
import * as d3 from "d3";

import PublicationHeader from '../components/publication/PublicationHeader.js';
import PublicationMap from '../components/publication/PublicationMap.js';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class Publication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracksProfile: []
    } 
  }

  

  render() {  //CALCULAMOS SI EL USUARIO TIENE RUTAS PARA MOSTRAR.

    if(this.state.tracksProfile.length==0){
      return (
        <div className="noResults">
          <p>No hay rutas para mostrar.</p>
          <div ref={el => this.mapContainer = el} className="map" />
        </div>
      )
    }else{
      return (
        <div className="publicationContent">
          
          <PublicationHeader view="12" updateView={this.updateView} tracksProfile={this.state.tracksProfile} />
          
        </div>
      );
    }
  }
}

export default Publication;
