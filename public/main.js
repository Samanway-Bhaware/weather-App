const api = {
  key: "c1abdb3e609ca2643592760b6ec0e192",
  base: "https://api.openweathermap.org/data/2.5/"
}

const tempElement = document.querySelector('.temp p');

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;
  console.log(weather.weather[0].main)


    

  switch(weather.weather[0].main){
    case 'Sunny':
      document.body.style.backgroundImage = "url('Sunny.jpg')";
      break;
    case 'Clear':
      document.body.style.backgroundImage = "url('Sunny.jpg')";
      break;
    case 'Rain':
      document.body.style.backgroundImage = "url('rain.jpg')";
      break;
    case 'Snow':
      document.body.style.backgroundImage = "url('snow.jpg')";
    break;
    case 'Mist' :
    document.body.style.backgroundImage = "url('haze.jpg')";
    break;

    case 'Fog' :
    document.body.style.backgroundImage = "url('fog.jpg')";
    break;
    case 'Smoke' :
    document.body.style.backgroundImage = "url('fog.jpg')";
    
    break;
    case 'Haze' :
    document.body.style.backgroundImage = "url('haze.jpg')";
    break;
    case 'Tornado' :
    document.body.style.backgroundImage = "url('dust.jpg')";
    break;
    case 'Dust' :
    document.body.style.backgroundImage = "url('dust.jpg')";
    break;
    case 'Sand' :
    document.body.style.backgroundImage = "url('dust.jpg')";
    break;
    case 'Clouds' :
    document.body.style.backgroundImage = "url('cloud.jpg')";
    break;
    case 'Drizzle':
    document.body.style.backgroundImage = "url('drizzle.jpg')";
    break;
    case 'Thunderstorm' :
    document.body.style.backgroundImage = "url('thunder.jpg')";
    break;
    default :
    document.body.style.backgroundImage = "url(default.jpg')";
    break;
  };

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function celsiusToFahrenheit(temperature){
  return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
  if(weather.main.temp === undefined) return;
  
  if(weather.main.temp.unit == "celsius"){
      let fahrenheit = celsiusToFahrenheit(weather.main.temp);
      fahrenheit = Math.floor(fahrenheit);
      
      tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
      weather.main.temp.unit = "fahrenheit";
  }else{
      tempElement.innerHTML = `${weather.main.temp}°<span>C</span>`;
      weather.main.temp.unit = "celsius"
  }
})
