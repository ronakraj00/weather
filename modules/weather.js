export default class weather {
  constructor(image, temp, dayOrNight, status) {
    this.image = image;
    this.temp = parseInt(temp);
    this.dayOrNight = dayOrNight;
    this.status = status;
  }
}
