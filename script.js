import weather from "./modules/weather.js";
import { domStuff } from "./modules/domStuff.js";
import resetDomData from "./modules/resetDomData.js";

(function () {
    if (navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const name = document.getElementById("name");
                name.innerText = "Please Wait ...";
                appWorking(
                    position.coords.latitude + "," + position.coords.longitude
                );
            },
            () => {
                appWorking("Delhi, india");
            },
            { enableHighAccuracy: true }
        );
    }
    const locationInput = document.getElementById("location");
    locationInput.addEventListener("focus", () => {
        locationInput.placeholder = "";
        locationInput.value = "";
    });
    const submitButton = document.querySelector("form button");
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (locationInput.value == "") {
            resetDomData();
            const name = document.getElementById("name");
            name.innerText = "Please Enter the Location";
        } else {
            appWorking(locationInput.value);
        }
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
