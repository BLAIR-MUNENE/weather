// Weather App — fetches live data from OpenWeatherMap and updates the page.
// Your API key lives in config.js (loaded before this file in index.htm).

// Base URL for current weather; units=metric gives Celsius and km/h wind.
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// Key is set in config.js; empty string if the file is missing.
const apiKey =
  typeof WEATHER_API_KEY !== "undefined" ? WEATHER_API_KEY : "";

// Grab the main bits of the UI we'll update after each search.
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const conditionPill = document.querySelector(".condition-pill");
const galleryIcons = document.querySelectorAll(".weather-gallery img");

// Which full-screen background image to show for each weather type.
const backgrounds = {
  Clear: "#sunnyDay",
  Clouds: "#cloudyDay",
  Drizzle: "#drizzle",
  Rain: "#rainyDay",
  default: "#defult",
};

// Small icons in the card for each condition from the API.
const conditionIcons = {
  Clouds: "images/clouds.png",
  Clear: "images/clear.png",
  Rain: "images/rain.png",
  Drizzle: "images/drizzle.png",
  Mist: "images/mist.png",
};

// Hide every background, then show only the one that matches the weather.
function showBackground(condition) {
  Object.values(backgrounds).forEach((selector) => {
    document.querySelector(selector).style.display = "none";
  });

  const activeBg = backgrounds[condition] || backgrounds.default;
  document.querySelector(activeBg).style.display = "block";
}

// Highlight the matching icon in the row at the bottom of the card.
function setActiveConditionIcon(condition) {
  galleryIcons.forEach((icon) => {
    icon.classList.toggle("active", icon.dataset.condition === condition);
  });
}

// Look up a city, call the API, and refresh temperature, humidity, wind, and visuals.
async function checkWeather(city) {
  if (!city.trim()) return;

  // Stop early if config.js wasn't set up yet.
  if (!apiKey || apiKey === "your_openweathermap_api_key_here") {
    document.querySelector(".error p").textContent =
      "Add your API key in config.js (copy from config.example.js)";
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  }

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();

  if (data.cod === 200) {
    // Success — fill in the weather card.
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + "km/h";

    const condition = data.weather[0].main;
    weatherIcon.src = conditionIcons[condition] || "images/clear.png";
    conditionPill.innerHTML = condition;
    showBackground(condition);
    setActiveConditionIcon(condition);

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  } else if (response.status === 404 || data.cod === "404" || data.cod === 404) {
    // City not found — show the error message and reset visuals.
    document.querySelector(".error p").textContent = "Invalid city name";
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    showBackground("default");
    setActiveConditionIcon("");
  } else {
    // Bad key, rate limit, or other API problem.
    document.querySelector(".error p").textContent =
      data.message || "Could not fetch weather. Check your API key in config.js.";
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    showBackground("default");
    setActiveConditionIcon("");
  }
}

// Search when the user clicks GO.
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Same search when they press Enter in the input box.
searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
