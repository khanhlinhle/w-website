import React from 'react'

export default function ChangeCities(props) {

    function getCity(cityname) {
        props.onSelectCity(cityname);
    }

    return (
        <div>
            <button
                className="choice-button"
                onClick={() => getCity("paris")}>
                Paris
                </button>
            <button
                className="choice-button"
                onClick={() => getCity("ha noi")}>
                Ha Noi
                </button>
            <button
                className="choice-button"
                onClick={() => getCity("sydney")}>
                Sydney
                </button>
            <button
                className="choice-button"
                onClick={() => getCity("tokyo")}>
                Tokyo
            </button>
        </div>
    )
}

