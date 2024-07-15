const API_KEY = "6dde827b363d42779d8201044232305"

const inputCity = document.getElementById("input-city");

const condition = document.querySelector(".condition");
const city = document.querySelector(".location");
const temperature = document.querySelector(".temperature");

const feelsLike = document.querySelector(".feels-like");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

const bodyBackground = document.getElementsByTagName("body")

async function getWeather(city){
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`,
    {mode: "cors"});

    const weather = await response.json();
    console.log(weather)

    return weather
}

async function GetBgImage(searchTerm){
    const url = `https://api.unsplash.com/search/photos?query=${searchTerm}&per_page=1&page=1&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k`

    const response = await fetch(url, {mode: "cors"});
    const imageResponse = await response.json();

    console.log(imageResponse)
    return imageResponse;
}

window.onload = getWeather("london").then(result => {
    condition.textContent = result.current.condition.text;
    city.textContent = `${result.location.name}, ${result.location.country}`
    temperature.textContent = result.current.temp_c + "°C"

    GetBgImage(result.current.condition.text).then(result => {
        console.log(result.results[0].urls.raw)
        document.body.style.backgroundImage = `url(${result.results[0].urls.raw})`;

    })

    feelsLike.textContent = "Feels Like: " + result.current.feelslike_c + "°C"
    humidity.textContent = "Humidiy: " + result.current.humidity + "%"
    wind.textContent = "Wind: " + result.current.wind_kph + "kph"
})

inputCity.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault()
        getWeather(inputCity.value).then(result => {
            condition.textContent = result.current.condition.text;
            city.textContent = `${result.location.name}, ${result.location.country}`
            temperature.textContent = result.current.temp_c + "°C"

            GetBgImage(result.current.condition.text).then(result => {
                document.body.style.backgroundImage = `url(${result.results[0].urls.raw})`;
            })
    
            feelsLike.textContent = "Feels Like: " + result.current.feelslike_c + "°C"
            humidity.textContent = "Humidiy: " + result.current.humidity + "%"
            wind.textContent = "Wind: " + result.current.wind_kph + "kph"
        })
    }
});