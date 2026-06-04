const apiKey = "YOUR_API_KEY";

document.getElementById("searchBtn").addEventListener("click", getWeather);

async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();

    if(city === ""){
        alert("Please enter a city name");
        return;
    }

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        document.getElementById("weatherResult").innerHTML = `
            <h2>${data.name}</h2>
            <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        `;

    }
    catch(error){

        document.getElementById("weatherResult").innerHTML =
        `<p style="color:red;">${error.message}</p>`;

    }
}
