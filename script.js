import weather from "./modules/weather.js";
import { domStuff } from "./modules/domStuff.js";

(function () {
    const locationInput = document.getElementById("location");
    locationInput.addEventListener("focus", () => {
        locationInput.placeholder = "";
        locationInput.value="";
    });
    locationInput.value="Delhi, india";
    const submitButton = document.querySelector("form button");
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        appWorking(locationInput.value);
    });
    submitButton.click();
})();

async function fetchWeather(location) {
    const fetchedData = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=27974539f25945dea0a164307232907&q=${location}`
    );
    const data = await fetchedData.json();
    console.log(data);
    return data;
}

function processData(data) {
    const image = data.current.condition.icon;
    const status = data.current.condition.text;
    const temp = data.current.temp_c;
    const dayOrNight = data.current.is_day;
    const name =
        data.location.name +
        ", " +
        data.location.region +
        ", " +
        data.location.country;
    const localTime = data.location.localtime;
    const humidity = data.current.humidity;
    const feelsLike = data.current.feelslike_c;
    const weatherInfo = new weather(
        image,
        temp,
        dayOrNight,
        status,
        name,
        localTime,
        humidity,
        feelsLike
    );
    return weatherInfo;
}

async function appWorking(location) {
    const data = await fetchWeather(location);
    if (data.error) {
        domStuff(data.error.message, null);
    } else {
        const weatherInfo = processData(data);
        domStuff(null, weatherInfo);
    }
}
