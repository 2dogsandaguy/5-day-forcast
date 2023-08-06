/* let weather = {
    apikey: "0b2bac7de75a83d23f6c55ae40424655",
    fetchWeather: function () {
        fetch(
            'https://api.openweathermap.org/data/2.5/forecast?lat=40.7128&lon=-74.0060&appid=0b2bac7de75a83d23f6c55ae40424655'
        )
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log("Error fetching data:", error));
    },
};

// Call the fetchWeather method
weather.fetchWeather(); */
// Define an object called 'weather' to store weather-related functions and data
var weather = {
    // Store the API key needed to make requests to the weather API
    apikey: "0b2bac7de75a83d23f6c55ae40424655",

    // Function to fetch weather data for a given city name
    fetchWeather: function (cityName) {
        // Create the API URL by combining the base URL with the cityName and the API key
        var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${this.apikey}&units=metric`;

        // Make a fetch request to the API URL to get the weather data
        fetch(apiUrl)
            // Parse the response as JSON and continue with the promise chain
            .then((response) => response.json())
            // Once the data is parsed, call the 'displayWeatherInfo' method with the fetched data
            .then((data) => this.displayWeatherInfo(data))
            // If there is an error during the fetch request, log the error message
            .catch((error) => console.log('Error fetching weather data:', error));
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

        // Log the city-related information to the console
        console.log(`City: ${cityName}`);
        console.log(`Country: ${country}`); 
        console.log(`Latitude: ${lat}`);
        console.log(`Longitude: ${lon}`);
    },

    // Function to display weather-related data for each data point
    displayWeatherData: function (data) {
        // Loop through each data point in the 'list' property of the fetched data
        data.list.forEach((item, index) => {
            // Extract weather information for each data point
            const date = new Date(item.dt * 1000); // Convert timestamp to date object
            const temperature = item.main.temp;
            const weatherDescription = item.weather[0].description;
            const windSpeed = item.wind.speed;
            const humidity = item.main.humidity;

            // Log the weather information for the current data point to the console
            console.log(`Data Point ${index}`);
            console.log(`Date: ${date}`);
            console.log(`Temperature: ${temperature} celsius`);
            console.log(`Weather Description: ${weatherDescription}`);
            console.log(`Wind Speed: ${windSpeed} m/s`);
            console.log(`Humidity: ${humidity}%`);
            console.log('------------------------');
        });
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
    } else {
        // If the city name is empty or contains only white spaces, show an alert to the user
        alert('Please enter a city name.');
    }
}


document.getElementById('search-btn').addEventListener('click', searchWeather);





