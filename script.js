let weather = {
    apikey: "0b2bac7de75a83d23f6c55ae40424655",
    fetchWeather: function () {
        fetch(
            'https://api.openweathermap.org/data/2.5/forecast?lat=40.7128&lon=-74.0060&appid=${this.apikey}'
        )
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log("Error fetching data:", error));
    },
};

// Call the fetchWeather method
weather.fetchWeather();
