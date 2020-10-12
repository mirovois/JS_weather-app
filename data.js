function Weather(cityName, description) {
  this.cityName = cityName;
  this.description = description;
  // private field, which is not set upon creating weather object
  this._temperatureFar = "";
  this._temperatureCel = "";

}
Object.defineProperty(Weather.prototype, "temperatureFarenheit", {
  get: function () {
    return this._temperatureFar;
  },
  set: function (value) {
    this._temperatureFar = ((value -273)* 1.8 + 32).toFixed(2) + "F";
  },
});

Object.defineProperty(Weather.prototype, "temperatureCelcius", {
  get: function () {
    return this._temperatureCel;
  },
  set: function(value) {
    this._temperatureCel = (value - 273.15).toFixed(0) + '°C';
  }
})
