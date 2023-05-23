const API_KEY = "6dde827b363d42779d8201044232305"
const inputCity = document.getElementById("input-city");
const searchCity = document.getElementById("search-city");

async function getWeather(city){
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`,
    {mode: "cors"});

    const weather = await response.json();

    return weather
}

searchCity.addEventListener("click", e => {
    e.preventDefault()
    getWeather(inputCity.value).then(result => {
        console.log(result)
    })
});