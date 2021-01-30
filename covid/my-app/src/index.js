import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlZXNlMTIzIiwiYSI6ImNraWF6am44bjA4Njgyc211YWs0eXc5NGwifQ.qAQCFWPsR-SRFBvWVQl1bg';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2
    };
  }
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });
  }
  render() {
    return (
      <div>
      <div ref={el => this.mapContainer = el} className="mapContainer" />
      </div>
    )
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
