weatherData = {
  ice: ["27", "89", "90"],
  snow: [
    "22",
    "23",
    "26",
    "36",
    "37",
    "38",
    "39",
    "70",
    "71",
    "72",
    "73",
    "74",
    "75",
    "76",
    "77",
    "78",
    "79",
    "83",
    "84",
    "85",
    "86",
    "87",
    "88",
    "93",
    "94",
  ],
  heavyRain: ["64", "65", "81", "82", "92"],
  rain: [
    "14",
    "15",
    "16",
    "20",
    "21",
    "24",
    "25",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
    "60",
    "61",
    "62",
    "63",
    "66",
    "67",
    "68",
    "69",
    "80",
    "91",
  ],
  wind: ["18"],
  tornado: ["19"],
  thunderstorm: ["13", "17", "29", "95", "96", "97", "98", "99"],
  fog: [
    "4",
    "10",
    "11",
    "12",
    "28",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
  ],
  sandstorm: ["5", "6", "7", "8", "9", "30", "31", "32", "33", "34", "35"],
  cloud: ["2", "3"],
  sun: ["0", "1"],
};

let bottomContainer = document.querySelector(".bottom-container");
let topContainer = document.querySelector(".top-container");

async function findCity() {
  try {
    let url = "./cityNames.json";
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function findCityResult() {
  findCity()
    .then((data) => {
      inputCityName(data, weatherData);
    })
    .catch((error) => {
      console.error(error);
    });
}
findCityResult();

function inputCityName(cityfetchdata, weatherData) {
  const inputArea = document.getElementById("change-city-search");
  const buttonArea = document.getElementById("change-city-button-container");
  inputArea.addEventListener("input", function () {
    clearData(buttonArea);
  });
  inputArea.addEventListener("input", function (v) {
    const cname = v.target.value.replace(" ", "").toLowerCase();
    console.log(cname);
    let cityKeys = {};
    cityfetchdata.forEach((d) => {
      if (
        d["city"].replace(" ", "").toLowerCase().substring(0, cname.length) ===
          cname &&
        cname !== ""
      ) {
        cityKeys[d["city_ascii"]] = {};
        cityKeys[d["city_ascii"]].lat = d.lat;
        cityKeys[d["city_ascii"]].lng = d.lng;
      } else if (
        d["city_ascii"]
          .replace(" ", "")
          .toLowerCase()
          .substring(0, cname.length) === cname &&
        cname !== "" &&
        d["city"] !== d["city_ascii"]
      ) {
        cityKeys[d["city_ascii"]] = {};
        cityKeys[d["city_ascii"]].lat = d.lat;
        cityKeys[d["city_ascii"]].lng = d.lng;
      }
    });
    console.log(Object.keys(cityKeys));
    if (Object.keys(cityKeys).length >= 20) {
      for (i = 0; i < 20; i++) {
        addCityButton(
          buttonArea,
          Object.keys(cityKeys)[i],
          cityKeys,
          weatherData
        );
      }
    } else {
      for (i = 0; i < Object.keys(cityKeys).length; i++) {
        addCityButton(
          buttonArea,
          Object.keys(cityKeys)[i],
          cityKeys,
          weatherData
        );
      }
    }
  });
}

function addCityButton(buttonArea, city, cityKeys, weatherData) {
  const cityButton = document.createElement("button");
  cityButton.textContent = `${city}`;
  cityButton.addEventListener("click", function () {
    clearData(topContainer);
    clearData(bottomContainer);
    crruentWeatherData(cityKeys[city].lat, cityKeys[city].lng, weatherData);
    dailyWeatherData(cityKeys[city].lat, cityKeys[city].lng, weatherData);
  });
  buttonArea.appendChild(cityButton);
}

function clearData(area) {
  area.innerHTML = "";
}

async function crruentWeatherData(lat, lng) {
  try {
    let currentUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m`;
    let respone = await fetch(currentUrl);
    let data = await respone.json();
    let info = data.current;

    let time = info.time;
    let cTimeDiv = document.createElement("div");
    cTimeDiv.setAttribute("class", "cTimeDiv");
    cTimeDiv.texContent = `${time.slice(0, 10)} ${time.slice(11)}`;
    topContainer.appendChild(cTimeDiv);
    console.log("current time " + time);

    let temp = info.temperature_2m;
    let cTempDiv = document.createElement("div");
    cTempDiv.setAttribute("class", "cTempDiv");
    cTempDiv.textContent = `${temp}°C`;
    topContainer.appendChild(cTempDiv);
    console.log("current temp " + temp);

    let bodyTemp = info.apparent_temperature;
    let cBodyTempDiv = document.createElement("div");
    cBodyTempDiv.setAttribute("class", "cBodyTempDiv");
    cBodyTempDiv.textContent = `${bodyTemp}°C`;
    bottomContainer.appendChild(cBodyTempDiv);
    console.log("current bodyTemp " + bodyTemp);

    let humidity = info.relative_humidity_2m;
    let cHumidityDiv = document.createElement("div");
    cHumidityDiv.setAttribute("class", "cHumidityDiv");
    cHumidityDiv.textContent = `${humidity}%`;
    bottomContainer.appendChild(cHumidityDiv);
    console.log("current humidity " + humidity);

    let windSpeed = info.wind_speed_10m;
    let cWindSpeedDiv = document.createElement("div");
    cWindSpeedDiv.setAttribute("class", "cWindSpeedDiv");
    cWindSpeedDiv.textContent = `${windSpeed}km/h`;
    bottomContainer.appendChild(cWindSpeedDiv);
    console.log("current windSpee " + windSpeed);

    let windDirec = info.wind_direction_10m;
    let cWndDirecDiv = document.createElement("div");
    cWndDirecDiv.setAttribute("class", "cWndDirecDiv");
    cWndDirecDiv.textContent = `${windDirec}°`;
    bottomContainer.appendChild(cWndDirecDiv);
    console.log("current windDirec " + windDirec);

    let weatherCode = String(info.weather_code);
    console.log("current weatherCode " + weatherCode);
    for (let weatherType in weatherData) {
      if (weatherData[weatherType].includes(weatherCode)) {
        console.log(weatherType);
        break; // 如果找到匹配的天氣情況，可以使用 break 結束迴圈
      }
    }
  } catch (error) {
    console.log("unable to fetch the crruent weather data");
  }
}

async function dailyWeatherData(lat, lng) {
  try {
    let dailyUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant`;
    let response = await fetch(dailyUrl);
    let data = await response.json();
    let info = data.daily;

    for (let j = 0; j < 7; j++) {
      let time = info.time[j];
      let dTimeDiv = document.createElement("div");
      dTimeDiv.setAttribute("class", "dTimeDiv");
      dTimeDiv.textContent = time;
      topContainer.appendChild(dTimeDiv);
      console.log("daily time " + time);

      let maxTemp = info.temperature_2m_max[j];
      let dMaxTempDiv = document.createElement("div");
      dMaxTempDiv.setAttribute("class", "dMaxTempDiv");
      dMaxTempDiv.textContent = `Max:${maxTemp}°C`;
      topContainer.appendChild(dMaxTempDiv);
      console.log("daily maxTemp " + maxTemp);

      let minTemp = info.temperature_2m_min[j];
      let dMinTempDiv = document.createElement("div");
      dMinTempDiv.setAttribute("class", "dMinTempDiv");
      dMinTempDiv.textContent = `Min:${minTemp}°C`;
      topContainer.appendChild(dMinTempDiv);
      console.log("daily minTemp " + minTemp);

      let uvIndex = info.uv_index_max[j];
      let dUvIndexDiv = document.createElement("div");
      dUvIndexDiv.setAttribute("class", "dUvIndexDiv");
      dUvIndexDiv.textContent = `UV:${uvIndex}`;
      bottomContainer.appendChild(dUvIndexDiv);
      console.log("daily uvIndex " + uvIndex);

      let rainProbability = info.precipitation_probability_max[j];
      let dRainProbabilityDiv = document.createElement("div");
      dRainProbabilityDiv.setAttribute("class", "dRainProbabilityDiv");
      dRainProbabilityDiv.textContent = `Raining:${rainProbability}%`;
      bottomContainer.appendChild(dRainProbabilityDiv);
      console.log("daily rainProbability " + rainProbability);

      let windSpeed = info.wind_speed_10m_max[j];
      let dWindSpeedDiv = document.createElement("div");
      dWindSpeedDiv.setAttribute("class", "dWindSpeedDiv");
      dWindSpeedDiv.textContent = `Wind Speed:${windSpeed}km/h`;
      bottomContainer.appendChild(dWindSpeedDiv);
      console.log("daily windSpeed " + windSpeed);

      let windDirec = info.wind_direction_10m_dominant[j];
      let dWindDirecDiv = document.createElement("div");
      dWindDirecDiv.setAttribute("class", "dWindDirecDiv");
      dWindDirecDiv.textContent = `Wind Direction:${windDirec}°`;
      bottomContainer.appendChild(dWindDirecDiv);
      console.log("daily windDirec " + windDirec);

      let weatherCode = info.weather_code[j];
      console.log("daily weatherCode " + weatherCode);

      for (let weatherType in weatherData) {
        if (weatherData[weatherType].includes(weatherCode)) {
          console.log(weatherType);
          break; // 如果找到匹配的天氣情況，可以使用 break 結束迴圈
        }
      }
    }
  } catch (error) {
    console.log("unable to fetch the daily weather data");
  }
}
