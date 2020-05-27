import './App.css';
import React, { Component, Fragment } from 'react'
import ChangeCities from './components/ChangeCities'
import Spinner from './components/Spinner';

import "bootstrap/dist/css/bootstrap.min.css"

export default class App extends Component {
  constructor(props) {

    super(props);
    this.state = {
      isReady: false,
      locationName: "",
      temperature: 0,
      description: ""
    }
  }
  // componentDidMount will run at the same time with opening browser
  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      this.getWeather(post.coords.latitude, post.coords.longitude)
    })
  }

  async getWeather(latitude, longitude) {
    const API_KEY = process.env.REACT_APP_APIKEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw "Something wrong!";
      }
      let data = await response.json();

      this.setState({
        isReady: true,
        locationName: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description
      });
    } catch (error) {
      alert(error);
    }
  };

  // Celsius ~> Kelvin = celsius + 273.15  
  // Celsius = Kelvin - 273.15
  // Celsius ~> Fahrenheit = celsius * 9/5 + 32
  // Fahrenheit = (Kelvin - 273.15) * 9/5 + 32
  getTemperature = (kelvin, type) => {
    if (type === "F") {
      return Math.round((kelvin - 273.15) * 9 / 5 + 32);
    }
    else if (type === "C") {
      return Math.round(kelvin - 273.15);
    }
  }

  getCityData = (data) => {
    this.setState({
      isReady: true,
      locationName: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description
    });
  }

  render() {
    const {
      isReady,
      locationName,
      temperature,
      description
    } = this.state;

    if (!isReady) return (
      <div className="linlin-container">
        <Spinner></Spinner>
      </div>
    );
    else return (

      <div className="container-fluid text-white my-auto">
        <div className="linlin-container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-success">
              Awesome Weather App
            </h1>
            <h2 className="col-12">{locationName}</h2>
            <div className="temperature-part">
              <h3 className="col-12 text-danger">{this.getTemperature(temperature, "C")}°C</h3>
              <span>/</span>
              <h3 className="col-12 text-danger">{this.getTemperature(temperature, "F")}°F</h3>
            </div>
            <h3 className="col-12">{description}</h3>
            <ChangeCities onSelectCity={this.getCityData}></ChangeCities>
          </div>
        </div>
        <div className="linlin-container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-success">
              Awesome Weather App
            </h1>
            <h2 className="col-12">{locationName}</h2>
            <div className="temperature-part">
              <h3 className="col-12 text-danger">{this.getTemperature(temperature, "C")}°C</h3>
              <span>/</span>
              <h3 className="col-12 text-danger">{this.getTemperature(temperature, "F")}°F</h3>
            </div>
            <h3 className="col-12">{description}</h3>
            <ChangeCities onSelectCity={this.getCityData}></ChangeCities>
          </div>
        </div>
      </div>
    );
  }
}
// get api theo ngay