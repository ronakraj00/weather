export function domStuff(error, weatherInfo) {
    const temp = document.getElementById("temp");
    const image = document.querySelector("#image img");
    const status = document.getElementById("status");
    const name = document.getElementById("name");
    const localTime = document.getElementById("local-time");
    const humidity = document.getElementById("humidity");
    const feelsLike = document.getElementById("feels-like");

    temp.innerHTML ="";
    status.innerText = "";
    image.src = "";
    if (error) {
        status.innerText = error;
    } else {
        temp.innerHTML = weatherInfo.temp + "<sup>°c</sup>";
        status.innerText = weatherInfo.status;
        image.src = weatherInfo.image;
        name.innerText=weatherInfo.name;
        localTime.innerText=weatherInfo.localTime;
        humidity.innerHTML="Humidity "+ "<span>"+weatherInfo.humidity+"<span>";
        feelsLike.innerHTML="Feels Like "+"<span>"+weatherInfo.feelsLike+"<span>"+"<sup>°c</sup>";
        setWallpaper(weatherInfo.status);
    }
}

async function setWallpaper(query) {
    const body = document.querySelector("#wallpaper");
    let wallpaper = await fetch(
        `https://api.unsplash.com/search/photos?query=sky ${query}&client_id=KXB55fXOYigKnhXTI2ooOc9OJwxamNWipvNC80L8-nw&per_page=20`,
        { mode: "cors" }
    );
    wallpaper = await wallpaper.json();
    let image = new Image();
    image.src = wallpaper.results[randomG()].urls.regular;
    image.addEventListener("load", () => {
        body.style.backgroundImage = `url(${image.src})`;
    });
}

function randomG() {
    return Math.floor(Math.random() * 20);
}
