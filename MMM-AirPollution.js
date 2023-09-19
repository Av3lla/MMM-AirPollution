/* Magic Mirror
 * Module: AirPollution
 *
 * By Avella https://github.com/Av3lla
 * MIT Licensed.
 */

Module.register("MMM-AirPollution", {
  defaults: {
    enableHeader: true,
    header: "Air Pollution",
    key: null,
    location: "강서구",
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
    return ["MMM-AirPollution.css"];
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
    const url = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty";
    const requestUrl = `${url}?serviceKey=${this.config.key}&returnType=${'json'}&stationName=${this.config.location}&dataTerm=${'DAILY'}&ver=${1.3}`;
    // fetch
    let airData = await fetch(requestUrl)
      .then(rawResponse => {
        return rawResponse.json();
      })
      .catch(error => {
        console.log(error);
      });
    this.pm10 = airData.response.body.items[0].pm10Value;
    this.pm2dot5 = airData.response.body.items[0].pm25Value;
    this.pm10Grade = airData.response.body.items[0].pm10Grade1h;
    this.pm2dot5Grade = airData.response.body.items[0].pm25Grade1h;
    
    this.updateDom();
  },
  
  getDom: function() {
    //grade 1=좋음 2=보통 3=나쁨 4=매우나쁨
    let gradeArray = ["좋음", "보통", "나쁨", "심각"];

    var mainDiv = document.createElement("div");
    var airDiv = document.createElement("div");
    airDiv.className = "air";
    var pm10Div = document.createElement("div");
    var pm10ContentsDiv = document.createElement("div");
    pm10ContentsDiv.className = "airValue";
    var pm2dot5Div = document.createElement("div");
    var pm2dot5ContentsDiv = document.createElement("div");
    pm2dot5ContentsDiv.className = "airValue";
    var developedbyDiv = document.createElement("div");
    developedbyDiv.className = "devby";
    developedbyDiv.innerHTML = "이지원 Github @Av3lla";
    
    pm10ContentsDiv.innerHTML = `${this.pm10}|${gradeArray[this.pm10Grade-1]}`;
    pm2dot5ContentsDiv.innerHTML = `${this.pm2dot5}|${gradeArray[this.pm2dot5Grade-1]}`;
    if (this.pm10Grade === '1') {
      pm10ContentsDiv.style.color = '#99FF99';
    } else if (this.pm10Grade === '2') {
      pm10ContentsDiv.style.color = '#FFFF99';
    } else if (this.pm10Grade === '3') {
      pm10ContentsDiv.style.color = '#FFB266';
    } else if (this.pm10Grade === '4') {
      pm10ContentsDiv.style.color = '#FF6666';
    } else {
      pm10ContentsDiv.style.color = '#FFFFFF';
    }
    if (this.pm2dot5Grade === '1') {
      pm2dot5ContentsDiv.style.color = '#99FF99';
    } else if (this.pm2dot5Grade === '2') {
      pm2dot5ContentsDiv.style.color = '#FFFF99';
    } else if (this.pm2dot5Grade === '3') {
      pm2dot5ContentsDiv.style.color = '#FFB266';
    } else if (this.pm2dot5Grade === '4') {
      pm2dot5ContentsDiv.style.color = '#FF6666';
    } else {
      pm2dot5ContentsDiv.style.color = '#FFFFFF';
    }
    
    pm10Div.append("미세먼지", pm10ContentsDiv);
    pm2dot5Div.append ("초미세먼지", pm2dot5ContentsDiv);
    
    airDiv.append(pm10Div, pm2dot5Div);
    mainDiv.append(airDiv, developedbyDiv);
    return mainDiv;
  }
});