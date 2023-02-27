/* Magic Mirror
 * Module: AirPollution
 *
 * By Avella https://github.com/Av3lla
 * MIT Licensed.
 */

Module.register("AirPollution", {
  defaults: {
    enableHeader: true,
    header: "Air Pollution",
    key: null,
    latitude: 37.56896164905004,
    longitude: 126.84714596472158,
    updateInterval: 1000 * 60
  },
  
  start: function() {
    var self = this;
    Log.info("Starting module: " + this.name);
    // load data
    this.load()
    // schedule refresh
    setInterval(function() {
      self.updateDom();
    }, this.config.updateInterval)
  },

  load: function() {
    this.getAirData();
  },

  getStyles: function() {
    return ["AirPollution.css"];
  },

  getHeader: function() {
    if (this.config.enableHeader) {
      return this.config.header;
    } else {
      return;
    }
  },

  getAirData: async function() {
    // request
    const url = "http://api.openweathermap.org/data/2.5/air_pollution";
    const requestUrl = `${url}?lat=${this.config.latitude}&lon=${this.config.longitude}&appid=${this.config.key}`;
    // fetch
    let airData = await fetch(requestUrl)
      .then(rawResponse => {
        return rawResponse.json();
      })
      .catch(error => {
        console.log(error);
      });
    this.pm10 = airData.list[0].components.pm10;
    this.pm2dot5 = airData.list[0].components.pm2_5;
    
    this.updateDom();
  },
  
  getDom: function() {
    var airDiv = document.createElement("div");
    airDiv.className = "air";
    var pm10Div = document.createElement("div");
    var pm10ValueDiv = document.createElement("div");
    pm10ValueDiv.className = "airValue";
    var pm2dot5Div = document.createElement("div");
    var pm2dot5ValueDiv = document.createElement("div");
    pm2dot5ValueDiv.className = "airValue";
    
    pm10ValueDiv.innerHTML = this.pm10;
    pm2dot5ValueDiv.innerHTML = this.pm2dot5;
    
    pm10Div.append("미세먼지(PM10)", pm10ValueDiv);
    pm2dot5Div.append ("초미세먼지(PM2.5)", pm2dot5ValueDiv);
    
    airDiv.append(pm10Div, pm2dot5Div);
    return airDiv;
  }
});