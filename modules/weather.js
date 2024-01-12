export default class weather {
    constructor(
        image,
        temp,
        dayOrNight,
        status,
        name,
        localTime,
        humidity,
        feelsLike
    ) {
        this.image = image;
        this.temp = parseInt(temp);
        this.dayOrNight = dayOrNight;
        this.status = status;
        this.name = name;
        this.localTime = localTime;
        this.humidity = humidity;
        this.feelsLike = feelsLike;
    }
}
