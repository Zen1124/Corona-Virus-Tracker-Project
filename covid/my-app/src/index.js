import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import mapboxgl, { GeolocateControl } from 'mapbox-gl';
import neighborhoods from './nyc-neighborhoods.json';


mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlZXNlMTIzIiwiYSI6ImNraWF6am44bjA4Njgyc211YWs0eXc5NGwifQ.qAQCFWPsR-SRFBvWVQl1bg';
class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -74.0060,
      lat: 40.730610,
      zoom: 10
    };
  }
  async componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });  
    
    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
    //initialize usr location
    var geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
    });
    //let colors = [];
    //add to map
    let hoveredNycId = null;
    map.addControl(geolocate);
    map.on('load', function() {
      geolocate.trigger();
      map.addSource('nyc', {
        'type': 'geojson',
        'data': neighborhoods
      });
      map.addLayer({
        'id': 'nyc-fill',
        'type': 'fill',
        'source': 'nyc',
        'layout': {},
        'paint': {
          'fill-color': '#088',
          'fill-opacity': ['case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0.5],
          'fill-outline-color': '#000'
        }
      });
    });
    map.on('mousemove', 'nyc-fills', function (e) {
      if (e.features.length > 0) {
        if (hoveredNycId) {
          map.setFeatureState(
            { source: 'states', id: hoveredNycId },
            { hover: false }
          );
        }
        hoveredNycId = e.features[0].id;
        map.setFeatureState(
          { source: 'states', id: hoveredNycId },
          { hover: true }
        );
      }
    });
       
      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      map.on('mouseleave', 'state-fills', function () {
        if (hoveredNycId) {
          map.setFeatureState(
            { source: 'states', id: hoveredNycId },
            { hover: false }
          );
        }
        hoveredNycId = null;
      });
  }
  render() {
    return (
      <div>   
        <div ref={el => this.mapContainer = el} className="mapContainer"/>         
      </div>
    )
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
