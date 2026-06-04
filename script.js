const apiKey = "YOUR_API_KEY";

const searchBtn =
document.getElementById("searchBtn");

const cityInput =
document.getElementById("cityInput");

const weatherResult =
document.getElementById("weatherResult");

searchBtn.addEventListener(
"click",
getWeather
);

async function getWeather(){

const city =
cityInput.value.trim();

if(city === ""){

weatherResult.innerHTML = `
<p class="error">
Please enter a city name
</p>
`;

return;
}

const url =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

try{

weatherResult.innerHTML =
"<p>Loading Weather...</p>";

const response =
await fetch(url);

if(!response.ok){

throw new Error(
"City not found"
);

}

const data =
await response.json();

weatherResult.innerHTML = `

<div class="weather-card">

<h2>
📍 ${data.name},
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
☁ Weather:
${data.weather[0].description}
</p>

<p>
📊 Pressure:
${data.main.pressure} hPa
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
