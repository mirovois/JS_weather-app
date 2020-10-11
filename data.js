function Weather(cityName, description) {
  this.cityName = cityName;
  this.description = description;
  // private field, which is not set upon creating weather object
  this._temperature = "";
}
Object.defineProperty(Weather.prototype, "temperature", {
  get: function () {
    return this._temperature;
  },
  set: function (value) {
    this._temperature = (value * 1.8 + 32).toFixed(2) + "F.";
  },
});
