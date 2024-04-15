const APIkey = "46d353ce29765dbac0983953dafd4b19"

$("#form").on('submit', function(event) {
    event.preventDefault();
    const city = $("#City-Input").val().trim();
    if (!city) return;
    fetchWeather(city);
    this.reset();
});

function fetchWeather(city) {
    $('#weather-forecast').html('<p>Loading forecast...</p>');
    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=metric`;

    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            if (data && data.list) {
                generateWeatherForecast(data);
            } else {
                console.error('No forecast data received:', data);
                $('#weather-forecast').html('<p>No forecast data available. Please check the city name and try again.</p>');
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            $('#weather-forecast').html('<p>Error retrieving forecast. Please try again.</p>');
        });
}

function generateWeatherForecast(data) {
    $('#weather-forecast').empty();
    const forecasts = data.list;
    let dailyData = {};

    // Group by day
    forecasts.forEach(slot => {
        const date = new Date(slot.dt * 1000).toDateString(); 
        if (!dailyData[date]) {
            dailyData[date] = [];
        }
        dailyData[date].push(slot);
    });

    console.log(Object.keys(dailyData)); // Log to check the keys/dates processed

    // Get only the first 5 days and the closest data point to noon
    Object.keys(dailyData).slice(0, 5).forEach(date => {
        let closestToNoon = dailyData[date].reduce((closest, current) => {
            const currentHour = new Date(current.dt * 1000).getHours();
            const closestHour = closest ? new Date(closest.dt * 1000).getHours() : null;
            const currentDiff = Math.abs(12 - currentHour);
            const closestDiff = closestHour !== null ? Math.abs(12 - closestHour) : Infinity;
            return currentDiff < closestDiff ? current : closest;
        }, null);

        if (closestToNoon) {
            displayForecast(closestToNoon);
        } else {
            console.log('No midday data found for', date);
        }
    });
}

function displayForecast(dayData) {
    const temp = dayData.main.temp;
    const humidity = dayData.main.humidity;
    const windSpeed = dayData.wind.speed;
    const description = dayData.weather[0].description;
    const iconCode = dayData.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const forecastHtml = `
        <div class="forecast-box">
            <h4>${new Date(dayData.dt * 1000).toDateString()}</h4>
            <img src="${iconUrl}" alt="Weather icon for ${description}" style="width:50px; height:50px;">
            <p>Temp: ${temp.toFixed(1)}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind: ${windSpeed} m/s</p>
            <p>${description}</p>
        </div>
    `;

    $('#weather-forecast').append(forecastHtml);
}



// YouTube API Integration
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'dQw4w9WgXcQ',
        playerVars: {
          'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// Functions for YouTube player events
function onPlayerReady(event) {
  console.log("Player is ready");
  event.target.playVideo();
    // Code to execute when the player is ready
}

function onPlayerStateChange(event) {
    // Code to execute on player state change
    console.log("Player Change:" , event.data);
}