export default function resetDomData(){
    const temp = document.getElementById("temp");
    const image = document.querySelector("#image img");
    const status = document.getElementById("status");
    const name = document.getElementById("name");
    const localTime = document.getElementById("local-time");
    const humidity = document.getElementById("humidity");
    const feelsLike = document.getElementById("feels-like");
    name.innerText = "";
    status.innerText = "";
    temp.innerText = "";
    status.innerText = "";
    image.src = "";
    localTime.innerText = "";
    humidity.innerText = "";
    feelsLike.innerText = "";
}