let locationAdd;
let searchBtn = $('#search-button');
let LocationList = $('.list-group');
let currentWeather = $('#today');

var today = dayjs();
$("#currentDay").text(today.format("dddd, MMMM Do"));

const locations = [];

searchBtn.on('click',  addlocation);

 // Add location to Locations array
function addlocation(event){
  let inputElement = $('#search-input');
  locationAdd = inputElement.val();
  locations.push(locationAdd);
  console.log(locations);
  console.log(locationAdd)
  renderLocationlist();
  inputElement.val('');
  
  event.preventDefault();
  
}

//loop throughthe array and display each location 


function renderLocationlist(){

  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ locationAdd + "&appid=9740464f964306bad708a660e0c862fe";

  console.log(locationAdd);
  
currentWeather.empty();
LocationList.empty();
  // Creates a Fetch call for the specific movie button being clicked
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      LocationList.innerHTML='';
      for (let i = 0; i < locations.length; i++) {
        locationAdd = locations[i]
        console.log(locationAdd)
        
        let locationelemet = $('<button>');
         locationelemet.attr("data-name");
         locationelemet.text(locationAdd);
         LocationList.append(locationelemet);
       console.log(locationelemet);  
       }




      let slectedCity = $('<h1>');
      slectedCity.text(`${locationAdd} ${today.format("DD/MM/YYYY")}`);
      currentWeather.append(slectedCity);

      let temperature = $('<p>');
      temperature.text(`temperature: ${data.main.temp}`);
      currentWeather.append(temperature);

      let wind = $('<p>');
      wind.text(`Wind: ${data.wind.speed}`);
      currentWeather.append(wind);

      let humidity = $('<p>');
      humidity.text(`humidity: ${data.main.humidity}`);
      currentWeather.append(humidity);


      

    })

};






  

