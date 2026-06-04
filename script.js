const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

const API_KEY = "YOUR_API_KEY";

weatherForm.addEventListener("submit", function(e){

    e.preventDefault();

    const city = cityInput.value.trim();

    if(city === ""){
        alert("Please enter a city name");
        return;
    }

    fetchWeather(city);

});

async function fetchWeather(city){

    weatherResult.innerHTML =
    "<p>Loading weather...</p>";

    try{

        const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        weatherResult.innerHTML = `
        <div class="weather-card">

            <h2>
            ${data.name},
            ${data.sys.country}
            </h2>

            <p>
            🌡 Temperature:
            ${data.main.temp} °C
            </p>

            <p>
            💧 Humidity:
            ${data.main.humidity} %
            </p>

            <p>
            🌬 Wind Speed:
            ${data.wind.speed} m/s
            </p>

            <p>
            ☁ Condition:
            ${data.weather[0].description}
            </p>

        </div>
        `;

    }
    catch(error){

        weatherResult.innerHTML = `
        <p class="error">
        ❌ ${error.message}
        </p>
        `;
    }
}
