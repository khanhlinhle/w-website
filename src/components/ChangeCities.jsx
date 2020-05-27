import React from 'react'

export default function ChangeCities(props) {
           
    async function getCityData(cityname)
    {
        let APIKEY=process.env.REACT_APP_APIKEY;
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIKEY}`
        let res= await fetch(url)
        let data= await res.json();
        console.log(data)
        props.onSelectCity(data)
    }

    // async function getForecastWeather(cityname) {
    //     let APIKEY=process.env.REACT_APP_APIKEY;
    //     let url=`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${APIKEY}`
    //     let res= await fetch(url)
    //     let data= await res.json();
    //     console.log("forecast", data)
    //     props.forecastWeather(data)
    // }


    return (
        <div>
            <button onClick={()=>getCityData("paris")}>Paris</button>
            <button onClick={()=>getCityData("ha noi")}>Ha Noi</button>
            <button onClick={()=>getCityData("sydney")}>Sydney</button>
            <button onClick={()=>getCityData("tokyo")}>Tokyo</button>
        </div>
    )
}

