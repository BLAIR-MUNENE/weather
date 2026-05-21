const apiKey = "9eb311dc3c3cb7b7221a91c7e2f08a77";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const conditionPill = document.querySelector(".condition-pill");
const galleryIcons = document.querySelectorAll(".weather-gallery img");

const backgrounds = {
  Clear: "#sunnyDay",
  Clouds: "#cloudyDay",
  Drizzle: "#drizzle",
  Rain: "#rainyDay",
  default: "#defult",
};

const conditionIcons = {
  Clouds: "images/clouds.png",
  Clear: "images/clear.png",
  Rain: "images/rain.png",
  Drizzle: "images/drizzle.png",
  Mist: "images/mist.png",
};

function showBackground(condition) {
  Object.values(backgrounds).forEach((selector) => {
    document.querySelector(selector).style.display = "none";
  });

  const activeBg = backgrounds[condition] || backgrounds.default;
  document.querySelector(activeBg).style.display = "block";
}

function setActiveConditionIcon(condition) {
  galleryIcons.forEach((icon) => {
    icon.classList.toggle("active", icon.dataset.condition === condition);
  });
}

async function checkWeather(city) {
  if (!city.trim()) return;

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();

  if (response.status === 404 || data.cod === "404") {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    showBackground("default");
    setActiveConditionIcon("");
  } else {
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
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
