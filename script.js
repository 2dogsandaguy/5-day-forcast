// Define an object called 'weather' to store weather-related functions and data
var weather = {
    apikey: '0b2bac7de75a83d23f6c55ae40424655',

    fetchWeather: function(cityName) {
        var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${this.apikey}&units=metric`;
      
        fetch(apiUrl)
          .then(response => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw new Error('Weather data not available for this city.');
            }
          })
          .then(data => {
            this.displayWeatherInfo(data);
            storeCity(cityName); // Call the storeCity function to store the searched city
            displayPastHistory(); // display the localstorage
          })
          .catch(error => console.log('Error fetching weather data:', error.message));
      },

    // Function to display weather information for a given city
    displayWeatherInfo: function (data) {
        // Call the 'displayCityInfo' method to show city-related information from the fetched data
        this.displayCityInfo(data);

        // Call the 'displayWeatherData' method to show weather-related data from the fetched data
        this.displayWeatherData(data);
    },

    // Function to display city-related information
    displayCityInfo: function (data) {
        // Extract city information from the fetched data
        var cityName = data.city.name;
        var country = data.city.country;
        var { lat, lon } = data.city.coord;

        // Select the HTML elements where you want to display the city information
        var cityNameElement = document.getElementById('city-name');
        var countryElement = document.getElementById('country');
        var coordinatesElement = document.getElementById('coordinates');

        // Set the innerHTML property of the selected elements to the city information
        cityNameElement.innerHTML = `City: ${cityName}`;
        countryElement.innerHTML = `Country: ${country}`;
        coordinatesElement.innerHTML = `Latitude: ${lat}, Longitude: ${lon}`;




        // Log the city-related information to the console
        console.log(`City: ${cityName}`);
        console.log(`Country: ${country}`);
        console.log(`Latitude: ${lat}`);
        console.log(`Longitude: ${lon}`);
    },
    // Function to display weather-related data for the first data point
    displayWeatherData: function (data) {
        // Select the HTML element where you want to display the weather data
        var weatherDataElement = document.getElementById('weather-data');

        // Clear the previous weather data
        weatherDataElement.innerHTML = '';

        // Extract the first data point from the 'list' property of the fetched data
        var item = data.list[0];

        // Extract weather information for this data point
        const date = new Date(item.dt * 1000).toDateString(); // Convert timestamp to date object
        const temperature = item.main.temp;
        const weatherDescription = item.weather[0].description;
        const windSpeed = item.wind.speed;
        const humidity = item.main.humidity;
        const iconCode = item.weather[0].icon; 
        const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`; 


        // Create a new div element for the data point
        var dataPointElement = document.createElement('div');
        dataPointElement.id = 'data-point-0';

        // Create individual elements for each piece of weather information
        var dateElement = document.createElement('p');
        dateElement.id = 'date-0';
        dateElement.innerHTML = `${date}`;

        var temperatureElement = document.createElement('p');
        temperatureElement.id = 'temperature-0';
        temperatureElement.innerHTML = `Temperature: ${temperature} celsius`;


        var descriptionElement = document.createElement('p');
        descriptionElement.id = 'description-0';
        descriptionElement.innerHTML = `Weather Description: ${weatherDescription}`;

        var windElement = document.createElement('p');
        windElement.id = 'wind-0';
        windElement.innerHTML = `Wind Speed: ${windSpeed} m/s`;

        var humidityElement = document.createElement('p');
        humidityElement.id = 'humidity-0';
        humidityElement.innerHTML = `Humidity: ${humidity}%`;

        var iconElement = document.createElement('img'); 
        iconElement.src = iconUrl; 
        iconElement.alt = 'Weather Icon'; 

        // Append the individual elements to the data point div
        dataPointElement.appendChild(dateElement);
        dataPointElement.appendChild(temperatureElement);
        dataPointElement.appendChild(descriptionElement);
        dataPointElement.appendChild(windElement);
        dataPointElement.appendChild(humidityElement);
        dataPointElement.appendChild(iconElement);

        // Append the new div element to the 'weather-data' element
        weatherDataElement.appendChild(dataPointElement);

    }
};

// Function to be called when the search button is clicked
function searchWeather() {
    // Get the value entered in the input field with ID 'cityInput'
    var cityName = document.getElementById('cityInput').value;

    // Check if the city name is not empty or only contains white spaces
    if (cityName.trim() !== '') {
        // If the city name is valid, call the 'fetchWeather' method to get weather data
        weather.fetchWeather(cityName);
        console.log('cityName; '+ cityName);
        
    } else {
        // If the city name is empty or contains only white spaces, show an alert to the user
        alert('Please enter a city name.');
    }
    //show the 5 day forcast
    showfiveDay();
};

function storeCity(cityName) {
    // Check if the city array already exists in local storage
    let cities = localStorage.getItem('cities');
    if (cities === null) {
      // If it doesn't exist, create a new array with the searched city
      cities = [cityName];
    } else {
      // If it exists, parse the stored JSON string into an array and add the searched city
      cities = JSON.parse(cities);
      cities.push(cityName);
    }
    // Convert the cities array to a JSON string and store it in local storage
    localStorage.setItem('cities', JSON.stringify(cities));
  };


function showfiveDay() {
    var apikey = "0b2bac7de75a83d23f6c55ae40424655";
    var URL = `https://api.openweathermap.org/data/2.5/forecast/?lat=37.7749&lon=-122.4194&appid=${apikey}&units=metric`;
  
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        const forecastData = data.list;
        const dailyForecast = [];
  
        for (let i = 0; i < forecastData.length; i += 8) {
          let forecast = forecastData[i];
          let date = forecast.dt_txt.split(" ")[0];
          let temperature = forecast.main.temp;
          let description = forecast.weather[0].description;
          let windSpeed = forecast.wind.speed; 
          let iconCode = forecast.weather[0].icon;
          let humidity = forecast.main.humidity;
          let iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
  
          const dailyData = {
            date: date,
            temperature: temperature,
            description: description,
            windSpeed: windSpeed,
            humidity: humidity,
            iconUrl: iconUrl
          };
  
          dailyForecast.push(dailyData);
        }
  
        // Select the HTML element where you want to display the forecast
        var weatherContainer = document.getElementById('weather-container');
  
        // Clear the previous forecast data
        weatherContainer.innerHTML = '';
  
        // Iterate over the dailyForecast array and create a new 'col' element for each day
        dailyForecast.forEach(function(data) {
          var colElement = document.createElement('div');
          colElement.className = 'col';
  
          // Create individual elements for each piece of forecast information
          var dateElement = document.createElement('p');
          dateElement.innerHTML = `Date: ${data.date}`;
  
          var temperatureElement = document.createElement('p');
          temperatureElement.innerHTML = `Temperature: ${data.temperature} celsius`;

          var humidityElement = document.createElement('p');
          humidityElement.innerHTML = `Humidity: ${data.humidity}%`;

          var windElement = document.createElement('p'); 
          windElement.innerHTML = `Wind Speed: ${data.windSpeed} m/s`; 
  
          var descriptionElement = document.createElement('p');
          descriptionElement.innerHTML = `Description: ${data.description}`;

  
          var iconElement = document.createElement('img');
          iconElement.src = data.iconUrl;
  
          // Append the individual elements to the 'col' element
          colElement.appendChild(dateElement);
          colElement.appendChild(temperatureElement);
          colElement.appendChild(humidityElement);
          colElement.appendChild(windElement);
          colElement.appendChild(descriptionElement);
          colElement.appendChild(iconElement);
  
          // Append the new 'col' element to the 'weather-container' element
          weatherContainer.appendChild(colElement);
        });
      })
      .catch(error => console.log('Error fetching forecast data:', error.message));
  };

function displayWeatherInfo(dailyForecast) {
    var weatherInfoElement = document.getElementById('weather-container');
  
    // Clear the previous weather info
    weatherInfoElement.innerHTML = '';
  
    // Iterate over the daily forecast data and create HTML elements to display the info
    dailyForecast.forEach(function(forecast) {
      var forecastElement = document.createElement('div');
      forecastElement.classList.add('forecast');
  
      var dateElement = document.createElement('p');
      dateElement.innerHTML = `Date: ${forecast.date}`;
      forecastElement.appendChild(dateElement);
  
      var temperatureElement = document.createElement('p');
      temperatureElement.innerHTML = `Temperature: ${forecast.temperature}°F`;
      forecastElement.appendChild(temperatureElement);
  
      var descriptionElement = document.createElement('p');
      descriptionElement.innerHTML = `Description: ${forecast.description}`;
      forecastElement.appendChild(descriptionElement);
  
      var iconElement = document.createElement('img');
      iconElement.src = forecast.iconUrl;
      forecastElement.appendChild(iconElement);
  
      weatherInfoElement.appendChild(forecastElement);
    });
  };

  function displayPastHistory() {
    // Get the past history element from the HTML
    var pastHistoryElement = document.getElementById('past-history');
  
    // Get the stored cities from local storage
    var cities = localStorage.getItem('cities');
  
    // Check if there are any stored cities
    if (cities !== null) {
      // Parse the stored JSON string into an array
      cities = JSON.parse(cities);
      let uniqueCities = new Set();
      cities.forEach(city => uniqueCities.add(city));
      uniqueCities = Array.from(uniqueCities);

      var newestCities = cities.slice(-10);
      newestCities = newestCities.reverse();
      // Clear the previous city list
      pastHistoryElement.innerHTML = '';
  
      // copy over the cities array and create list items for each city
      newestCities.forEach(function(city) {

        var listItem = document.createElement('li');
        listItem.innerHTML = city;
        pastHistoryElement.appendChild(listItem);
      });
    };
  };
  
  // Call the displayPastHistory function to populate the past history in the HTML
  displayPastHistory();
document.getElementById('search-btn').addEventListener('click', searchWeather);


