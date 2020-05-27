import React, { Component } from 'react'
import { getTemperature } from "./ulti"

export default class ForecastWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.date,
            temperature: props.temperature,
            description: props.description
        };
    }

    render() {
        const {
            date,
            temperature,
            description,
        } = this.state;

        return (
            <div >
                <div>
                    <h2 className="date-part">{date}</h2>
                    <div className="forecast-temperature-part">
                        <h3 className="forecast-temperature-text text-danger">{getTemperature(temperature, "C")}°C</h3>
                        <span>/</span>
                        <h3 className="forecast-temperature-text text-danger">{getTemperature(temperature, "F")}°F</h3>
                    </div>
                    <h4 className="description-part">{description}</h4>
                </div>
            </div>
        )
    }
}
