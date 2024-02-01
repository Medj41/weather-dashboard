let InputLocation;
let slectedCity;
let searchBtn = $("#search-button");
let LocationList = $(".list-group");
let currentWeather = $("#today");
let forecastDays = $("#forecast");

var today = dayjs();
$("#currentDay").text(today.format("dddd, MMMM Do"));

const locations = [];

searchBtn.on("click", addlocation);

// Add location to Locations array
function addlocation(event) {
  let inputElement = $("#search-input");
  InputLocation = inputElement.val();
  locations.push(InputLocation);
  console.log(locations);
  console.log(InputLocation);
  renderLocationlist();
  forecast();
  inputElement.val("");

  event.preventDefault();
}

//loop throughthe array and display each location

function renderLocationlist() {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    InputLocation +
    "&appid=9740464f964306bad708a660e0c862fe";

  console.log(InputLocation);

  currentWeather.empty();
  LocationList.empty();
  // Creates a Fetch call for the specific movie button being clicked
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      LocationList.innerHTML = "";
      for (let i = 0; i < locations.length; i++) {
        InputLocation = locations[i];
        console.log(InputLocation);

        let locationelemet = $("<button>");
        locationelemet.attr("data-name");
        locationelemet.text(InputLocation);
        LocationList.append(locationelemet);
        console.log(locationelemet);
      }

      currentWeather.addClass("border border-dark");
      slectedCity = $("<h1>");
      let img = $('<img>');
      // img.attr("src", " https://openweathermap.org/img/wn/" + data.list.weather[0].icon + ".png" );

      slectedCity.text(`${InputLocation} ${today.format("DD/MM/YYYY")} ${img}`)
      currentWeather.append(slectedCity, img);

      let temperature = $("<p>");
      data.main.temp = Math.floor(data.main.temp - 273.15);
      temperature.text(`temperature: ${data.main.temp}`);
      currentWeather.append(temperature);

      let wind = $("<p>");
      wind.text(`Wind: ${data.wind.speed}`);
      currentWeather.append(wind);

      let humidity = $("<p>");
      humidity.text(`humidity: ${data.main.humidity}`);
      currentWeather.append(humidity);
    });
}

function forecast() {
  console.log(InputLocation);

  var queryURL2 =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    InputLocation +
    "&appid=9740464f964306bad708a660e0c862fe";
  forecastDays.empty();
  fetch(queryURL2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (let i = 0; i < data.list.length; i++) {
        console.log(data);
        if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
          data.list[i].main.temp = Math.floor(data.list[i].main.temp - 273.15);
          // temperature.text(`temperature: ${data.main.temp}`);

          // let cardBody = $('.card-group')

          let col = $("<div>");
          col.addClass("col-lg mb-3 mb-sm-0");
          let card = $("<div>");
          card.addClass("card");
          let cardBody = $("<div>");
          cardBody.addClass("card-body border border-dark");

          let date = $("<p>");
          date.addClass("card-text");
          date.text(`${data.list[i].dt_txt}`);

          let icon = $("<img>");
          icon.addClass("card-text");
          icon.attr("src", " https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png" );
          // icon.text(`${data.list[i].weather[0].icon}`);

          let temperature = $("<p>");
          temperature.addClass("card-text");
          temperature.text(` Temperature: ${data.list[i].main.temp}`);

          let wind = $("<p>");
          wind.addClass("card-text");
          wind.text(` Wind Speed: ${data.list[i].wind.speed}`);

          let humidity = $("<p>");
          humidity.addClass("card-text");
          humidity.text(` Humidity: ${data.list[i].main.humidity}`);

          forecastDays.append(col);
          col.append(cardBody);
          cardBody.append(date, icon, temperature, wind, humidity);
        }
      }
    });
}

// <div class="col-sm-3 mb-3 mb-sm-0">
//               <div class="card">
//                 <div class="card-body">
//                   <p class="card-text">With supporting text below</p>
//               </div>
//             </div>
