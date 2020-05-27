import React from 'react'

export default function ChangeCities(props) {

    async function getCityData(cityname) {
        let APIKEY = process.env.REACT_APP_APIKEY;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIKEY}`
        let res = await fetch(url)
        let data = await res.json();
        props.onSelectCity(data);

        let res2 = await fetch(url);
        let data2 = await res2.json();
    }

    return (
        <div>
            <button onClick={() => getCityData("paris")}>Paris</button>
            <button onClick={() => getCityData("ha noi")}>Ha Noi</button>
            <button onClick={() => getCityData("sydney")}>Sydney</button>
            <button onClick={() => getCityData("tokyo")}>Tokyo</button>
        </div>
    )
}

