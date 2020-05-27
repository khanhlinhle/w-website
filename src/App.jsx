import './App.css';
import React, { Component } from 'react';
import ChangeCities from './components/ChangeCities';
import Spinner from './components/Spinner';
import ForecastWeather from "./components/ForecastWeather"
import { getTemperature } from './components/ulti';
import "bootstrap/dist/css/bootstrap.min.css";

const API_KEY = process.env.REACT_APP_APIKEY;

export default class App extends Component {
  constructor(props) {

    super(props);
    this.state = {
      isReady: false,
      locationName: "",
      foreCast: [],
      bgClassName: "",
    }
  }

  // componentDidMount will run at the same time with opening browser
  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      const long = post.coords.longitude;
      const lat = post.coords.latitude;
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`;

      // this.getWeather(url);
      this.getForecast(url);
    })
  }

  setCityName = (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    // this.getWeather(url);
    this.getForecast(url);
  }

  setBgImg = (description) => {
    if (description.includes("clouds")) {
      return (
        <img className="background-img" src="https://i.pinimg.com/564x/cc/53/58/cc53584ee414e8ffcd5e6878ee2d92df.jpg" />
      );
    } else if (description.includes("rain")) {
      return (
        <img className="background-img" src="https://i.pinimg.com/564x/1f/bb/72/1fbb72486206e0e47d123ad5d0160feb.jpg" />
      );
    } else if (description.includes("sky")) {
      return (
        <img className="background-img" src="https://i.pinimg.com/474x/5a/a4/8a/5aa48a5dbca64842ac6e6c759b5082de.jpg" />
      );
    }
  }
  // async getWeather(url) {
  //   try {
  //     let response = await fetch(url);
  //     if (!response.ok) {
  //       throw "Something wrong!";
  //     }
  //     let data = await response.json();
  //     this.setState({
  //       isReady: true,
  //       locationName: data.name,
  //       temperature: data.main.temp,
  //       description: data.weather[0].description
  //     });
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  async getForecast(url) {
    try {
      url = url.replace("weather?", "forecast?");

      let response = await fetch(url);
      if (!response.ok) {
        throw "Something wrong!";
      }
      let data = await response.json();
      let arrForecast = [];

      for (const forecast of data.list) {
        const date = forecast.dt_txt.split(" ")[0];
        const findDate = arrForecast.find(f => f.date === date);
        if (findDate) continue;

        arrForecast.push(
          {
            date: forecast.dt_txt.split(" ")[0],
            temperature: forecast.main.temp,
            description: forecast.weather[0].description
          }
        );
      }

      this.setState({
        isReady: true,
        locationName: data.city.name,
        foreCast: arrForecast,
      });
    } catch (error) {
      alert(error);
    }
  };

  render() {
    const {
      isReady,
      locationName,
      foreCast,
    } = this.state;

    if (!isReady) return (
      <div className="linlin-container">
        <Spinner></Spinner>
      </div>
    );

    else return (
      <div className="container-fluid text-white">
        <div className="linlin-container">
          <div className="justify-content-center text-center">
            <h1 className="text-success">
              Lin Lin Weather App
            </h1>
            <h2>{locationName}</h2>
            <div className="temperature-part">
              <h3 className="text-danger">{getTemperature(foreCast[0].temperature, "C")}°C</h3>
              <span>/</span>
              <h3 className="text-danger">{getTemperature(foreCast[0].temperature, "F")}°F</h3>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h3>{foreCast[0].description}</h3>
              <div>{this.setBgImg(foreCast[0].description)}</div>
            </div>
            <ChangeCities onSelectCity={this.setCityName}></ChangeCities>
          </div>
        </div>
        <div className="linlin-container">
          <h1 className="text-success text-center">
            Forecast:
              </h1>
          <div className="col-12 forecast-part">
            {foreCast.map(item => {
              return (
                <ForecastWeather
                  date={item.date}
                  temperature={item.temperature}
                  description={item.description}
                >
                </ForecastWeather>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}