const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchInputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    searchResultsEl.innerHTML = "";
  }
console.log(localStorage.length);
console.log(localStorage.getItem("testKey"));

if (typeof localStorage !== "undefined") {
    console.log("Local Storage is available.");
} 
else {
    console.log("Local Storage is not supported in this browser.");
}
  const results = data.results;

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsEl.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) {
    showMoreButtonEl.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});
// TIMER FUNCTIONALITY
let timeLeft = 60; // 1 minutes (in seconds)
const timerEl = document.getElementById("timer");
const redirectUrl = "https://silver-gnome-80ae3e.netlify.app/"; // Change this to your desired URL

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds; // Format 0-9 as 00-09
    timerEl.textContent = `⏳ ${minutes}:${seconds}`;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        window.location.href = redirectUrl; // Redirect to new website
    }
    timeLeft--;
}

// Start countdown every second
const timerInterval = setInterval(updateTimer, 1000);

const weatherApiKey = "8611d06a04a33486df270ad1a229af68"; // Replace with your actual API key
const weatherEl = document.getElementById("weather"); // Select the weather display element

async function fetchTemperature(lat, lon) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.main && data.main.temp) {
            weatherEl.textContent = `🌡️ Temperature: ${data.main.temp}°C`;
        } else {
            weatherEl.textContent = "Could not fetch weather data.";
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
        weatherEl.textContent = "Weather unavailable.";
    }
}

// Get user's location
navigator.geolocation.getCurrentPosition(
    (position) => {
        const { latitude, longitude } = position.coords;
        fetchTemperature(latitude, longitude);
    },
    (error) => {
        console.error("Geolocation error:", error);
        weatherEl.textContent = "Location access denied.";
    }
);
