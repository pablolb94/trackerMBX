import React, { Component } from 'react';
import { Linkn, Redirect } from 'react-router-dom';
import mapboxgl from 'mapbox-gl'
import * as d3 from "d3";
import moment from 'moment';
require('moment/locale/es.js');

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class PublicationProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }    
  }

  componentDidMount() {
    const { lng, lat } = this.state;
    var data = this.props.track;
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/satellite-v9',
      zoom: 5
    });

    map.on('load', function () {
      var coordinates = data.features[0].geometry.coordinates;

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
      /*
      map['scrollZoom'].disable();
      map['boxZoom'].disable();
      map['dragRotate'].disable();
      map['dragPan'].disable();
      */
    });
    
  }

  render() {  //CALCULAMOS SI EL USUARIO TIENE RUTAS PARA MOSTRAR.
    var likes = 0;
    var likeYou = false;
    if(this.props.track.likes){
        likes = this.props.track.likes.length;
        this.props.track.likes.forEach(element => {
            if(element == this.props.account.id){
                likeYou = true;
            }
        });
    }

    var thisMem = this;

    return (
        <div className="publicationContent">
        <div className="publicationDiv">
            <div className="publicationHeader">
                <div className="parseRoute">
                    
                </div>
                <span class="glyphicon glyphicon-cog" onClick={function(){thisMem.props.updateIdRouteCRUD(thisMem.props.track.snapKey);}} data-toggle="modal" data-target="#delRouteModal"></span>
                <span class="glyphicon glyphicon-fullscreen"></span>
            </div>
            <div ref={el => this.mapContainer = el} className="map" />
            <div className="publicationBody">
                <div className="interactions">
                    {
                        likeYou ?
                            (<span class="glyphicon glyphicon-heart"></span>)
                        :
                            (<span class="glyphicon glyphicon-heart-empty"></span>)
                    }
                    
                    <span class="glyphicon glyphicon-play"></span>
                    <span class="glyphicon glyphicon-info-sign">&nbsp;</span>
                    &nbsp; {likes} &nbsp;&nbsp;&nbsp;&nbsp;
                    <span class="glyphicon glyphicon-comment"></span> &nbsp;
                    (12) 
                </div>
            </div>
            <div className="publicationFooter">
                {moment(this.props.track.date).fromNow()}
            </div>
        </div>
        </div>
    );
  }
}

export default PublicationProfile;
