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

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = chrome.runtime.getURL("content.css");
document.head.appendChild(link);

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("background.js's Message:", message);

  let latLng = message.savedLatLng;

  if (latLng && message.savedWeatherNotice === "on") {
    dailyWeatherData(latLng[1], latLng[2]);
  }
});

async function dailyWeatherData(lat, lng) {
  try {
    let dailyUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant`;
    let response = await fetch(dailyUrl);
    let data = await response.json();
    let info = data.daily;
    console.log(info);
    let weatherCode = info.weather_code[1].toString();

    if (
      weatherData.heavyRain.includes(weatherCode) ||
      weatherData.rain.includes(weatherCode)
    ) {
      console.log("duck");
      duck();
    }
  } catch (error) {
    console.log("unable to fetch the daily weather data");
  }
}

let duck = () => {
  console.log("I'M contentjs");

  let imgContainer = document.createElement("div");
  imgContainer.setAttribute("class", "weatherMan");

  let body = document.querySelector("body");
  let text = document.createElement("div");
  text.setAttribute("class", "raintext");
  text.textContent = "RAIN Tomorrow";

  let img = document.createElement("img");
  let url = "https://clipart-library.com/image_gallery/n1618165.gif";
  img.setAttribute("src", url);
  img.style.width = "120px";
  img.style.height = "auto";

  let closeBtn = document.createElement("div");
  closeBtn.setAttribute("class", "closeBtn");
  closeBtn.textContent = "X";

  imgContainer.appendChild(text);
  imgContainer.appendChild(img);
  imgContainer.appendChild(closeBtn);
  body.appendChild(imgContainer);

  closeBtn.addEventListener("click", function () {
    imgContainer.innerHTML = "";
  });
};
