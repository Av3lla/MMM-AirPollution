# Air Pollution Module

![JavaScript](https://img.shields.io/badge/JavaScript-181717.svg?logo=javascript)
![GitHub repo size](https://img.shields.io/github/repo-size/av3lla/air-pollution-module)
[![GitHub](https://img.shields.io/github/license/av3lla/air-pollution-module)](https://mit-license.org/)

### Magic Mirror Module

A module for the [MagicMirror](https://github.com/MichMich/MagicMirror) to display a [*air pollution*](https://en.wikipedia.org/wiki/Air_pollution) using data from [OpenWeatherMap](https://openweathermap.org/).

---

* ## Preview
![preview](.github/preview.png)

---

* ## Usage
    You need to install and configure the module for your MagicMirror.

    ### Setup
    Clone the module into your modules folder.
    ```shell
    cd ~/MagicMirror/modules && git clone https://github.com/Av3lla/air-pollution-module
    ```
    ### [* Folder name issue](#known-issues)

    ### Configuration

    Add the module configuration to your `config.js` file.

    ```js
    {
    	module: 'AirPollution',
    	position: 'top_right',
    	config: {
            enableHeader: true,
            header: "header",
            key: 'ApiKey',
            latitude: '37.5689',
            longitude: '126.8471',
            updateInterval: '1000 * 60'
    	}
    },
    ```

    | Option | Description | Default | Required |
    |---|---|---|---|
    | `enableHeader` | enable header if you want. | `true` | X |
    | `header` | set header | `Air Pollution` | X |
    | `key` | the API key from OpenWeatherMap.| `null` | O |
    | `latitude` | latitude | `37.5689` | O |
    | `longitude` | longitude | `126.8471` | O |
    | `updateInterval` | change the update period in Milliseconds. | `1000*60` | X |

---

### NOTE

#### Known Issues
  * You Need to change the *folder name* from `air-pollution-module` to `AirPollution`.