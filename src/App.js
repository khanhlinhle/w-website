import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React, { Component } from 'react'

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

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      this.getWeather(post.coords.latitude, post.coords.longitude)
    })
  }

  async getWeather(latitude, longitude) {
    const API_KEY = "524433393f1ecf8af511b3c51ea6db8d";
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
  getTemperature(kelvin, type) {
    if (type === "F") return (kelvin - 273.15) * 9 / 5 + 32;
    else if (type === "C") return kelvin - 273.15;
  }

  // temperatureC: getTemperature(data.main.temp, "C"),
  // temperatureF: getTemperature(data.main.temp, "F"),
  render() {
    const {
      isReady,
      locationName,
      temperature,
      description
    } = this.state;

    if (!isReady) return (
      <div>Hihi</div>
    );
    else return (
      <div className="container-fluid text-white my-auto">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-success">
              Awesome Weather App
            </h1>
            <h2 className="col-12">{locationName}</h2>
            <h3 className="col-12 text-danger">{temperature}</h3>
            <h3 className="col-12">{description}</h3>
          </div>
        </div>
      </div>
    );
  }
}

// spinner
// long + lat : cities
// get api theo ngay