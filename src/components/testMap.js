import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import * as d3 from "d3";

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';



class SimpleExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -4.190338,
      lat: 37.427712,
    };
  }

  componentDidMount() {
    const { lng, lat } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/satellite-v9',
      zoom: 5
    });

    map.on('load', function () {
      // We use D3 to fetch the JSON here so that we can parse and use it separately
      // from GL JS's use in the added source. You can use any request method (library
      // or otherwise) that you want.

      var data = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
'coordinates':[
[-4.193932, 37.432815],
[-4.194007, 37.432615],
[-4.194007, 37.432415],
[-4.194007, 37.432215],
[-4.194007, 37.432073],
[-4.193807, 37.431873],
[-4.193707, 37.431673],
[-4.193607, 37.431473],
[-4.193535, 37.431383],
[-4.193335, 37.431283],
[-4.193335, 37.431183],
[-4.193135, 37.431083],
[-4.192698, 37.430770],
[-4.192290, 37.429952],
[-4.191786, 37.429509],
[-4.191561, 37.429109],
[-4.191152, 37.428494],
[-4.190572, 37.427880],
[-4.190338, 37.427712],
[-4.189947, 37.427516],
[-4.189759, 37.427158],
[-4.189191, 37.426706],
[-4.188697, 37.426280],
[-4.187990, 37.425939],
[-4.187775, 37.425411],
[-4.187486, 37.424883],
[-4.187121, 37.424124],
[-4.186939, 37.423843],
]
                }
            }
        ]
    }
      var coordinates = data.features[0].geometry.coordinates;

      data.features[0].geometry.coordinates = [coordinates[0]];
      

      map.addSource('trace', { type: 'geojson', data: data });
      map.addLayer({
        "id": "trace",
        "type": "line",
        "source": "trace",
        "paint": {
          "line-color": "#FF512F",
          "line-opacity": 0.75,
          "line-width": 5
        }
      });

      map.jumpTo({ 'center': coordinates[0], 'zoom': 16 });
      map.setPitch(30);

      var i = 0;
      var timer = window.setInterval(function() {
        if (i < coordinates.length) {
          data.features[0].geometry.coordinates.push(coordinates[i]);
          map.getSource('trace').setData(data);
          map.panTo(coordinates[i]);
          i++;
        } else {
          window.clearInterval(timer);
        }
        }, 40);
      });
    
  }

  render() {
    
    const { lng, lat, zoom } = this.state;
    
    return (
      <div className="publication">
        <div className="publicationHeader">
          <div className="parseRoute">
            <span class="glyphicon glyphicon-chevron-left"></span>
            <span>2 / 12</span>
            <span class="glyphicon glyphicon-chevron-right"></span>
          </div>
          <span class="glyphicon glyphicon-cog"></span>
          <span class="glyphicon glyphicon-fullscreen"></span>
        </div>
        <div ref={el => this.mapContainer = el} className="map" />
        <div className="publicationBody">
          <div className="interactions">
            <span class="glyphicon glyphicon-star"></span>
            <span class="glyphicon glyphicon-play"></span>
            <span class="glyphicon glyphicon-info-sign">&nbsp;</span>
            
            &nbsp; (1160)         
          </div>
          <hr/>
          <div className="dificult">
            <h4>Dificultad:</h4>
            <div className="dificultDiv">
              <input type="range" min="1" max="10" value="7" class="slider" />
            </div>
          </div>
          <hr/>
          <div className="comments">
            <h4>Comentarios:</h4>
            <div className="comment">
              <a href="#">Pablolb94:</a> Comentario de Prueba 👏👏
            </div>
            <div className="comment">
              <a href="#">enlatao:</a> Comentario 2
            </div>
            <div className="comment">
              <a href="#">Joni:</a> Ruta demasiado facil
            </div>
            <div className="comment">
              <a href="#">Javito:</a> Viva Mexico cabrones ! 
            </div>
          </div>
          <div className="showAllComments">Mostrar todos (4)</div>
          <div className="showAllComments">Comentar</div>
        </div>
        <div className="publicationFooter">05/01/2019</div>
      </div>
    );
  }
}

export default SimpleExample;