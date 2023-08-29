export function domStuff(weatherInfo) {
    const temp = document.getElementById("temp");
    const image = document.querySelector("#image img");
    const status = document.getElementById("status");

    temp.innerHTML = weatherInfo.temp + "<sup>°c</sup>";
    status.innerText = weatherInfo.status;
    image.src = weatherInfo.image;

    setWallpaper(weatherInfo.status);
}

async function setWallpaper(query) {
    const body = document.querySelector("#wallpaper");
    let wallpaper = await fetch(
        `https://api.unsplash.com/search/photos?query=sky ${query}&client_id=KXB55fXOYigKnhXTI2ooOc9OJwxamNWipvNC80L8-nw&per_page=10`,
        { mode: "cors" }
    );
    wallpaper = await wallpaper.json();
    body.src = wallpaper.results[randomG()].urls.regular;
}

function randomG() {
    return Math.floor(Math.random() * 10);
}
