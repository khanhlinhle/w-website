
// Celsius ~> Kelvin = celsius + 273.15  
// Celsius = Kelvin - 273.15
// Celsius ~> Fahrenheit = celsius * 9/5 + 32
// Fahrenheit = (Kelvin - 273.15) * 9/5 + 32

export function getTemperature(kelvin, type) {
    if (type === "F") {
        return Math.round((kelvin - 273.15) * 9 / 5 + 32);
    }
    else if (type === "C") {
        return Math.round(kelvin - 273.15);
    }
}
