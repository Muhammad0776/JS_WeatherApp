window.addEventListener("DOMContentLoaded", () => {
  const api = {
    key: "d0f2df4311506c32247b4ae9b5ae7366",
    baseUrl: "https://api.openweathermap.org/data/2.5/",
  };

  const searchBox = document.querySelector(".search-box");
  searchBox.addEventListener("keypress", setQuery);

  function setQuery(e) {
    // e (event) -> hodisa
    if (e.keyCode === 13) {
      // keyCode = keypress
      getResults(searchBox.value);
      console.log(searchBox.value);
    }
  }

  const getResults = (query) => {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((weather) => {
        return weather.json();
      })
      .then(displayResults);
  };

  const displayResults = (weather) => {
    console.log(weather);
    let city = document.querySelector(".location .city");
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".date");
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weatherEl = document.querySelector(".weather");
    weatherEl.innerHTML = weather.weather[0].main;

    let hiLow = document.querySelector(".hi-low");
    hiLow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
      weather.main.temp_max
    )}°C`;
  };

  const dateBuilder = (m) => {
    let Months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let Days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = Days[m.getDay()];
    let date = m.getDate();
    let month = Months[m.getMonth()];
    let year = m.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
});
