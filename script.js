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

let savedLatLng = JSON.parse(localStorage.getItem("City"));
let latLng = savedLatLng;
if (!latLng) {
  document.querySelector(".city-name").textContent = "Select City >>";
}
let bottomContainer = document.querySelector(".bottom-container");
let topContainer = document.querySelector(".top-container");
let celsiusBtn = document.querySelector(".setting-degree-celsius");
let fahrenheitBtn = document.querySelector(".setting-degree-fahrenheit");
let kmBtn = document.querySelector(".setting-speed-km");
let mileBtn = document.querySelector(".setting-speed-mile");
let rainReminderBtnOn = document.getElementsByClassName(
  "setting-rain-reminder-on"
);
let rainReminderBtnOff = document.getElementsByClassName(
  "setting-rain-reminder-off"
);
let layoutGraphicalBtn = document.getElementsByClassName(
  "setting-layout-choice-graphical"
);
let layoutDescriptiveBtn = document.getElementsByClassName(
  "setting-layout-choice-descriptive"
);
let page = 0; //page 0-6
let dailyArr = [];
let weatherArr = [];
let savedDegreeUnit = localStorage.getItem("DegreeUnit");
let degreeUnit = savedDegreeUnit;
if (!degreeUnit) {
  degreeUnit = "°C";
  celsiusBtn.classList.add("selected");
} else if (degreeUnit === "°C") {
  celsiusBtn.classList.add("selected");
} else if (degreeUnit === "°F") {
  fahrenheitBtn.classList.add("selected");
}
let savedSpeedUnit = localStorage.getItem("SpeedUnit");
let speedUnit = savedSpeedUnit;
if (!speedUnit) {
  speedUnit = "km/h";
  kmBtn.classList.add("selected");
} else if (speedUnit === "km/h") {
  kmBtn.classList.add("selected");
} else if (speedUnit === "mph") {
  mileBtn.classList.add("selected");
}
let savedRainReminder = localStorage.getItem("RainBtn");
let rainReminder = savedRainReminder;
if (!rainReminder) {
  rainReminder = "on";
  rainReminderBtnOn[0].classList.add("selected");
} else if (rainReminder === "on") {
  rainReminderBtnOn[0].classList.add("selected");
} else if (rainReminder === "off") {
  rainReminderBtnOff[0].classList.add("selected");
}

chrome.runtime.sendMessage({
  savedLatLng: latLng,
  savedWeatherNotice: rainReminder,
});

let savedLayout = localStorage.getItem("Layout");
let layout = savedLayout;
if (!layout) {
  layout = "Descriptive";
  layoutDescriptiveBtn[0].classList.add("selected");
} else if (layout === "Descriptive") {
  layoutDescriptiveBtn[0].classList.add("selected");
} else if (layout === "Graphical") {
  layoutGraphicalBtn[0].classList.add("selected");
  document.querySelector(".graphical-container").classList.remove("hidden");
  document.querySelector(".city-name").classList.add("city-name-graphical");
  document
    .querySelector(".sun-cloud-pic")
    .classList.add("weather-icon-graphical");
  document
    .querySelector(".change-city-link")
    .classList.add("change-city-link-graphical");
  document
    .querySelector(".weather-degree")
    .classList.add("weather-degree-graphical");
  document
    .querySelector(".degree-max-min")
    .classList.add("degree-max-min-graphical");
  document.querySelector(".date").classList.add("date-graphical");
  document
    .querySelector(".bottom-container")
    .classList.add("bottom-container-graphical");
  document
    .querySelector(".footer-container")
    .classList.add("footer-container-graphical");
}

document
  .querySelector(".change-city-link")
  .addEventListener("click", function () {
    document.querySelector("#change-city-container").classList.remove("hidden");
  });

document
  .querySelector(".change-city-close")
  .addEventListener("click", function () {
    document.querySelector("#change-city-container").classList.add("hidden");
  });

document
  .querySelector(".setting-button")
  .addEventListener("click", function () {
    document.querySelector(".setting-container").classList.remove("hidden");
  });

document.querySelector(".setting-close").addEventListener("click", function () {
  document.querySelector(".setting-container").classList.add("hidden");
});

document
  .querySelector(".setting-close-2")
  .addEventListener("click", function () {
    document.querySelector(".setting-container").classList.add("hidden");
  });

celsiusBtn.addEventListener("click", function () {
  let CDegree = "°C";
  localStorage.setItem("DegreeUnit", CDegree);
  degreeUnit = CDegree;
  console.log(degreeUnit);
  fahrenheitBtn.classList.remove("selected");
  celsiusBtn.classList.add("selected");
  crruentWeatherData(latLng[1], latLng[2]);
});

fahrenheitBtn.addEventListener("click", function () {
  let FDegree = "°F";
  localStorage.setItem("DegreeUnit", FDegree);
  degreeUnit = FDegree;
  console.log(degreeUnit);
  celsiusBtn.classList.remove("selected");
  fahrenheitBtn.classList.add("selected");
  crruentWeatherData(latLng[1], latLng[2]);
});
kmBtn.addEventListener("click", function () {
  let kmSpeedUnit = "km/h";
  localStorage.setItem("SpeedUnit", kmSpeedUnit);
  speedUnit = kmSpeedUnit;
  console.log(speedUnit);
  mileBtn.classList.remove("selected");
  kmBtn.classList.add("selected");
  crruentWeatherData(latLng[1], latLng[2]);
});

mileBtn.addEventListener("click", function () {
  let mpSpeedUnit = "mph";
  localStorage.setItem("SpeedUnit", mpSpeedUnit);
  speedUnit = mpSpeedUnit;
  console.log(speedUnit);
  kmBtn.classList.remove("selected");
  mileBtn.classList.add("selected");
  crruentWeatherData(latLng[1], latLng[2]);
});

rainReminderBtnOn[0].addEventListener("click", function () {
  let rainBtnOn = "on";
  localStorage.setItem("RainBtn", rainBtnOn);
  rainReminder = rainBtnOn;
  console.log(rainReminder);
  rainReminderBtnOff[0].classList.remove("selected");
  rainReminderBtnOn[0].classList.add("selected");
  crruentWeatherData(latLng[1], latLng[2]);
});

rainReminderBtnOff[0].addEventListener("click", function () {
  let rainBtnOff = "off";
  localStorage.setItem("RainBtn", rainBtnOff);
  rainReminder = rainBtnOff;
  console.log(rainReminder);
  rainReminderBtnOn[0].classList.remove("selected");
  rainReminderBtnOff[0].classList.add("selected");
  document.querySelector(".graphical-container").classList.add("hidden");
  crruentWeatherData(latLng[1], latLng[2]);
});

layoutGraphicalBtn[0].addEventListener("click", function () {
  let layoutG = "Graphical";
  localStorage.setItem("Layout", layoutG);
  layout = layoutG;
  console.log(layout);
  layoutDescriptiveBtn[0].classList.remove("selected");
  layoutGraphicalBtn[0].classList.add("selected");
  document.querySelector(".graphical-container").classList.remove("hidden");
  document.querySelector(".city-name").classList.add("city-name-graphical");
  document
    .querySelector(".sun-cloud-pic")
    .classList.add("weather-icon-graphical");
  document
    .querySelector(".change-city-link")
    .classList.add("change-city-link-graphical");
  document
    .querySelector(".weather-degree")
    .classList.add("weather-degree-graphical");
  document
    .querySelector(".degree-max-min")
    .classList.add("degree-max-min-graphical");
  document.querySelector(".date").classList.add("date-graphical");
  document
    .querySelector(".bottom-container")
    .classList.add("bottom-container-graphical");
  document
    .querySelector(".footer-container")
    .classList.add("footer-container-graphical");
  crruentWeatherData(latLng[1], latLng[2]);
});
layoutDescriptiveBtn[0].addEventListener("click", function () {
  let layoutD = "Descriptive";
  localStorage.setItem("Layout", layoutD);
  layout = layoutD;
  console.log(layout);
  layoutGraphicalBtn[0].classList.remove("selected");
  layoutDescriptiveBtn[0].classList.add("selected");
  document.querySelector(".graphical-container").classList.add("hidden");
  document.querySelector(".city-name").classList.remove("city-name-graphical");
  document
    .querySelector(".sun-cloud-pic")
    .classList.remove("weather-icon-graphical");
  document
    .querySelector(".change-city-link")
    .classList.remove("change-city-link-graphical");
  document
    .querySelector(".weather-degree")
    .classList.remove("weather-degree-graphical");
  document
    .querySelector(".degree-max-min")
    .classList.remove("degree-max-min-graphical");
  document.querySelector(".date").classList.remove("date-graphical");
  document
    .querySelector(".bottom-container")
    .classList.remove("bottom-container-graphical");
  document
    .querySelector(".footer-container")
    .classList.remove("footer-container-graphical");
  crruentWeatherData(latLng[1], latLng[2]);
});

function clearArr() {
  dailyArr = [];
  weatherArr = [];
}

function FirstIn() {}
FirstIn();
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
      inputCityName(data);
    })
    .catch((error) => {
      console.error(error);
    });
}
findCityResult();

function inputCityName(cityfetchdata) {
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
    // console.log(Object.keys(cityKeys));
    if (Object.keys(cityKeys).length >= 20) {
      for (i = 0; i < 20; i++) {
        addCityButton(
          buttonArea,
          Object.keys(cityKeys)[i],
          cityKeys,
          inputArea
        );
      }
    } else {
      for (i = 0; i < Object.keys(cityKeys).length; i++) {
        addCityButton(
          buttonArea,
          Object.keys(cityKeys)[i],
          cityKeys,
          inputArea
        );
      }
    }
  });
}

function addCityButton(buttonArea, city, cityKeys, inputArea) {
  const cityButton = document.createElement("button");
  cityButton.textContent = `${city}`;
  cityButton.addEventListener("click", function () {
    crruentWeatherData(cityKeys[city].lat, cityKeys[city].lng);
    let result = [city, cityKeys[city].lat, cityKeys[city].lng];
    localStorage.setItem("City", JSON.stringify(result));
    latLng = result;
    clearData(buttonArea);
    inputArea.value = "";
    document.querySelector("#change-city-container").classList.add("hidden");
    console.log(latLng);
  });
  buttonArea.appendChild(cityButton);
}

function clearData(area) {
  area.innerHTML = "";
}

async function crruentWeatherData(lat, lng) {
  try {
    clearArr();
    let currentUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m`;
    let respone = await fetch(currentUrl);
    let data = await respone.json();
    let info = data.current;
    let currObj = {
      time: info.time,
      humidity: info.relative_humidity_2m,
      windSpeed: info.wind_speed_10m.toFixed(1),
      windDirec: info.wind_direction_10m,
      showers: info.showers,
      snowfall: info.snowfall,
      rain: info.rain,
    };

    if (degreeUnit === "°F") {
      currObj["temp"] = ((info.temperature_2m * 9) / 5 + 32).toFixed(1);
      currObj["bodyTemp"] = ((info.apparent_temperature * 9) / 5 + 32).toFixed(
        1
      );
    } else if (degreeUnit === "°C") {
      currObj["temp"] = info.temperature_2m;
      currObj["bodyTemp"] = info.apparent_temperature;
    }
    if (speedUnit === "mph") {
      currObj["windSpeed"] = (info.wind_speed_10m *= 0.621371192).toFixed(1);
    } else if (speedUnit === "km/h") {
      currObj["windSpeed"] = info.wind_speed_10m.toFixed(1);
    }
    Object.keys(weatherData).forEach((w) => {
      if (weatherData[w].indexOf(`${info.weather_code}`) > -1) {
        currObj["weatherCode"] = w;
      }
    });
    dailyWeatherData(lat, lng, currObj);
  } catch (error) {
    console.log("unable to fetch the crruent weather data");
  }
}

async function dailyWeatherData(lat, lng, CData) {
  try {
    let dailyUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant`;
    let response = await fetch(dailyUrl);
    let data = await response.json();
    let info = data.daily;
    for (let j = 1; j < 7; j++) {
      let tempObj = {
        time: info.time[j],
        uvIndex: info.uv_index_max[j],
        rainProbability: info.precipitation_probability_max[j],
        windDirec: info.wind_direction_10m_dominant[j],
      };
      if (degreeUnit === "°F") {
        tempObj["maxTemp"] = (
          (info.temperature_2m_max[j] * 9) / 5 +
          32
        ).toFixed(1);
        tempObj["minTemp"] = (
          (info.temperature_2m_min[j] * 9) / 5 +
          32
        ).toFixed(1);
      } else if (degreeUnit === "°C") {
        tempObj["maxTemp"] = info.temperature_2m_max[j];
        tempObj["minTemp"] = info.temperature_2m_min[j];
      }
      if (speedUnit === "mph") {
        tempObj["windSpeed"] = (info.wind_speed_10m_max[
          j
        ] *= 0.621371192).toFixed(1);
      } else if (speedUnit === "km/h") {
        tempObj["windSpeed"] = info.wind_speed_10m_max[j];
      }
      Object.keys(weatherData).forEach((w) => {
        if (weatherData[w].indexOf(`${info.weather_code[j]}`) > -1) {
          tempObj["weatherCode"] = w;
        }
      });
      dailyArr.push(tempObj);
    }
    weatherArr = [CData, ...dailyArr];
    console.log("weatherArr");
    console.log(weatherArr);
    displayWeather(page);
  } catch (error) {
    console.log("unable to fetch the daily weather data");
  }
}

crruentWeatherData(latLng[1], latLng[2]);

function displayWeather(ArrPosition) {
  const BG = document.getElementById("container"); // remember to add id container in HTML
  const WIcon = document.getElementById("weather-icon"); // remember to add id weather-icon in HTML
  BG.className = `container ${weatherArr[ArrPosition].weatherCode}-bg`; // remember to change classname in css to match weatherArr
  WIcon.src = `./${weatherArr[ArrPosition].weatherCode}.svg`;
  document.querySelector(".city-name").textContent = latLng[0];
  document.querySelector(".date").textContent = weatherArr[
    ArrPosition
  ].time.substring(5, 10);
  document.getElementsByClassName(
    "details"
  )[0].href = `https://www.metcheck.com//WEATHER/now_and_next.asp?location=${
    latLng[1].toString().split(".")[0]
  }%2E${latLng[1].toString().split(".")[1]}%2F${
    latLng[2].toString().split(".")[0]
  }%2E${latLng[2].toString().split(".")[1]}&locationID=&lat=${latLng[1]}&lon=${
    latLng[2]
  }`;
  if (ArrPosition == 0) {
    document.querySelector(".weather-degree-max ").innerHTML = "";
    document.querySelector(".weather-degree-min ").innerHTML = "";
    document.getElementsByClassName("prec-prob info")[0].textContent = "";
    document.querySelector(".weather-degree").textContent =
      weatherArr[ArrPosition].temp + degreeUnit;
    document.getElementsByClassName("appa-temp info")[0].textContent =
      "Body Temperature: " + weatherArr[ArrPosition].bodyTemp + degreeUnit;
    document.getElementsByClassName("rh info")[0].textContent =
      "Humidity: " + weatherArr[ArrPosition].humidity + "%";
    document.getElementsByClassName("wind-dir info")[0].textContent =
      "Wind Direction: " + weatherArr[ArrPosition].windDirec + "°";
    document.getElementsByClassName("wind-speed info")[0].textContent =
      "Wind Speed: " + weatherArr[ArrPosition].windSpeed + speedUnit;
    document.getElementsByClassName("showers info")[0].textContent =
      "Showers: " + weatherArr[ArrPosition].showers + "mm";
    document.getElementsByClassName("snowfall info")[0].textContent =
      "Snowfall: " + weatherArr[ArrPosition].snowfall + "cm";
    document.getElementsByClassName("rain info")[0].textContent =
      "Rain: " + weatherArr[ArrPosition].rain + "mm";
    document.getElementsByClassName("uv-index info")[0].innerHTML = "";
  } else {
    document.querySelector(".weather-degree").innerHTML = "";
    document.getElementsByClassName("appa-temp info")[0].innerHTML = "";
    document.getElementsByClassName("rain info")[0].innerHTML = "";
    document.getElementsByClassName("showers info")[0].innerHTML = "";
    document.getElementsByClassName("snowfall info")[0].innerHTML = "";
    document.getElementsByClassName("rh info")[0].innerHTML = "";
    document.querySelector(".weather-degree-min").textContent =
      "min " + weatherArr[ArrPosition].minTemp + degreeUnit;
    document.querySelector(".weather-degree-max").textContent =
      "max " + weatherArr[ArrPosition].maxTemp + degreeUnit;
    document.getElementsByClassName("uv-index info")[0].textContent =
      "UV Index: " + weatherArr[ArrPosition].uvIndex;
    //sun cloud photo not done yet
    document.getElementsByClassName("wind-dir info")[0].textContent =
      "Wind Direction: " + weatherArr[ArrPosition].windDirec + "°";
    document.getElementsByClassName("wind-speed info")[0].textContent =
      "Wind Speed: " + weatherArr[ArrPosition].windSpeed + speedUnit;
    document.getElementsByClassName("prec-prob info")[0].textContent =
      "Precipitation: " + weatherArr[ArrPosition].rainProbability + "%";
  }
  if (layout === "Graphical") {
    document.getElementsByClassName("wind-dir info")[0].innerHTML = "";
    document.getElementsByClassName("showers info")[0].innerHTML = "";
    document.getElementsByClassName("snowfall info")[0].innerHTML = "";
    document.getElementsByClassName("rain info")[0].innerHTML = "";
  }
  if (weatherArr[ArrPosition].showers <= 0) {
    document.getElementsByClassName("showers info")[0].innerHTML = "";
  }

  if (weatherArr[ArrPosition].snowfall <= 0) {
    document.getElementsByClassName("snowfall info")[0].innerHTML = "";
  }

  if (weatherArr[ArrPosition].rain <= 0) {
    document.getElementsByClassName("rain info")[0].innerHTML = "";
  }

  document.querySelector(
    ".page"
  ).textContent = `weatherArr[${ArrPosition}] page(${ArrPosition}) day(${
    ArrPosition + 1
  })`;
}

document.querySelector(".right-button").addEventListener("click", function () {
  if (page >= 0 && page <= 5) {
    page++;
    displayWeather(page);
  }

  disableBtn();
});

document.querySelector(".left-button").addEventListener("click", function () {
  if (page >= 1 && page <= 6) {
    page--;
    displayWeather(page);
  }

  disableBtn();
});

function disableBtn() {
  if (page === 0) {
    document.querySelector(".left-button").classList.add("button-disabled");
  } else if ((page) => 1 && page <= 6) {
    document.querySelector(".left-button").classList.remove("button-disabled");
  }

  if (page === 6) {
    document.querySelector(".right-button").classList.add("button-disabled");
  } else if ((page) => 0 && page <= 5) {
    document.querySelector(".right-button").classList.remove("button-disabled");
  }
}

let easterBtn = document.querySelector(".easterBtn");
easterBtn.addEventListener("click", function () {
  if (
    document
      .querySelector(".setting-container")
      .classList.contains("easter-setting")
  ) {
    document.querySelector(".egg").classList.add("hidden");
    document
      .querySelector(".setting-container")
      .classList.remove("easter-setting");
    document
      .querySelector(".setting-degree-celsius")
      .classList.remove("easter-unit");
    document
      .querySelector(".setting-degree-fahrenheit")
      .classList.remove("easter-unit");
    document.querySelector(".setting-speed-km").classList.remove("easter-unit");
    document
      .querySelector(".setting-speed-mile")
      .classList.remove("easter-unit");
    document
      .querySelector(".setting-rain-reminder-on")
      .classList.remove("easter-unit");
    document
      .querySelector(".setting-rain-reminder-off")
      .classList.remove("easter-unit");
    document
      .querySelector(".setting-layout-choice-graphical-text")
      .classList.remove("easter-unit");
    document
      .querySelector(".setting-layout-choice-descriptive-text")
      .classList.remove("easter-unit");
    document.querySelector(".setting-layout-ok").classList.remove("easter-Ok");
    document.querySelector(".setting-layout-ok").textContent = "OK";
  } else {
    document.querySelector(".egg").classList.remove("hidden");
    document
      .querySelector(".setting-container")
      .classList.add("easter-setting");
    document
      .querySelector(".setting-degree-celsius")
      .classList.add("easter-unit");
    document
      .querySelector(".setting-degree-fahrenheit")
      .classList.add("easter-unit");
    document.querySelector(".setting-speed-km").classList.add("easter-unit");
    document.querySelector(".setting-speed-mile").classList.add("easter-unit");
    document
      .querySelector(".setting-rain-reminder-on")
      .classList.add("easter-unit");
    document
      .querySelector(".setting-rain-reminder-off")
      .classList.add("easter-unit");
    document
      .querySelector(".setting-layout-choice-graphical-text")
      .classList.add("easter-unit");
    document
      .querySelector(".setting-layout-choice-descriptive-text")
      .classList.add("easter-unit");
    document.querySelector(".setting-layout-ok").classList.add("easter-Ok");
    document.querySelector(".setting-layout-ok").textContent = "O . K .";
  }
});
