import weather from "./modules/weather.js";
import { domStuff } from "./modules/domStuff.js";

(function () {
    const locationInput = document.getElementById("location");
    const submitButton = document.querySelector("form button");
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        appWorking(locationInput.value);
    });
})();

async function fetchWeather(location) {
    const fetchedData = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=27974539f25945dea0a164307232907&q=${location}`
    );
    const data = await fetchedData.json();
    return data;
}

function processData(data) {
    const image = data.current.condition.icon;
    const status = data.current.condition.text;
    const temp = data.current.temp_c;
    const dayOrNight = data.current.is_day;
    const weatherInfo = new weather(image, temp, dayOrNight, status);
    return weatherInfo;
}

async function appWorking(location) {
    const data = await fetchWeather(location);
    const weatherInfo = processData(data);
    domStuff(weatherInfo);
}
