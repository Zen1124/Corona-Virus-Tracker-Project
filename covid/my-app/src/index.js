import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import mapboxgl, { GeolocateControl } from 'mapbox-gl';


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
    let zipcodes = await App();
    console.log(zipcodes);
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
    //add to map
    map.addControl(geolocate);
    /*map.on('load', function() {
      geolocate.trigger();
      map.addSource('maine', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [
            [
          
            ]
            ]
          }
        }
        });
        map.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': 'maine',
        'layout': {},
        'paint': {
        'fill-color': '#088',
        'fill-opacity': 0.8
        }
        });
    });*/
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
