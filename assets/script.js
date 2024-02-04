let InputLocation;
let slectedCity;
let searchBtn = $("#search-button");
let LocationList = $(".list-group");
let currentWeather = $("#today");
let forecastDays = $("#forecast");
let locationButton = $("<button>");
// let value = InputLocation;

var today = dayjs();
$("#currentDay").text(today.format("dddd, MMMM Do"));
const locations = JSON.parse(localStorage.getItem("locations")) || [];



// search button 

searchBtn.on("click", function addlocation(event) {
  let inputElement = $("#search-input");
  InputLocation = inputElement.val();

if (InputLocation) {
  if (!locations.includes(InputLocation)) {
    locations.push(InputLocation);
  }else if (inputElement === "") {
    return;
  }
}
    
  

  

  
  DisplayCurrentWeather(InputLocation);
  forecast(InputLocation);
  storedCities(InputLocation);
  inputElement.val("");
  event.preventDefault();
});


// DisplayCurrentWeather list function

function DisplayCurrentWeather(InputLocation) {
  
  

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    InputLocation +
    "&appid=9740464f964306bad708a660e0c862fe";


  currentWeather.empty();
  LocationList.empty();

  // Creates a Fetch call for the specific movie button being clicked
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      currentWeather.addClass("border border-dark");
      slectedCity = $("<h1>");
      let iconOne = $("<img>");
      iconOne.attr(
        "src",
        " https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
      );

      slectedCity.text(`${InputLocation} ${today.format("DD/MM/YYYY")}`);
      currentWeather.append(slectedCity, iconOne);

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

      for (let i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.indexOf("12:00:00") !== -1) {
          data.list[i].main.temp = Math.floor(data.list[i].main.temp - 273.15);


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
          icon.attr(
            "src",
            " https://openweathermap.org/img/wn/" +
              data.list[i].weather[0].icon +
              ".png"
          );

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


LocationList.on("click", function displayButton(event) {
  let value = event.target.textContent;
  InputLocation = value;
  DisplayCurrentWeather(InputLocation);
  forecast(InputLocation);
  storedCities(InputLocation);
  console.log(value);
});


// 
function storedCities() {
  LocationList.innerHTML = "";
  for (let i = 0; i < locations.length; i++) {
    InputLocation = locations[i];

    locationButton = $("<button>");
    locationButton.attr("data-name value");
    locationButton.addClass("mb-1");
    locationButton.text(InputLocation);
    LocationList.append(locationButton);
    localStorage.setItem("locations", JSON.stringify(locations));
  }
}
