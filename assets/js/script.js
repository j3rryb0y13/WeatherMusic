const APIkey = "46d353ce29765dbac0983953dafd4b19"
const GooKey = "AIzaSyDdp5iphkWD7E92Kt38IlGzoDj2p1pBmQs"
let videoId
$("form").on("submit",function(event){
    event.preventDefault();
    
    
    let city = event.target[0].value;
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
    
    $('#weather-container').empty();

    fetch(queryURL)
    .then(response => {
        return response.json()
    })
    .then(data =>{

        const weatherId = data.weather[0].id
        generateWeather(data)
        if(weatherId <= 232){
            return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=rain&key=${GooKey}`)
        }else if(weatherId >= 233 && weatherId <= 321){
            return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=jazz&key=${GooKey}`)
        }else if(weatherId >= 322 && weatherId <= 531){
            return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=rnb&key=${GooKey}`)
        }else if(weatherId >= 532 && weatherId <= 622){
            return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=rickroll&key=${GooKey}`)
        }else if(weatherId >= 623 && weatherId <= 781){
            return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=popmusic&key=${GooKey}`)
        }else if(weatherId == 800){
            return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=country&key=${GooKey}`)
        }else if(weatherId >= 801){
            return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=classical&key=${GooKey}`)
        }
    })
    .then(response => {
        if(typeof response === "string"){
            console.log(response)
            return response;
        }else{
            return response.json()

        }
    }).then(videoRes =>{
        console.log(videoRes)
        videoId = videoRes.items[0].id.videoId
        renderYT()
    })
    .catch(error => console.log(error))
    localStorage.setItem('cityname', city)

    $("#City-Input").val('');
});

function generateWeather(weather) {
    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;

    const card = $('<div>').addClass('card');
    const cardBody = $('<div>').addClass('card-body');

    const weatherName = $('<h2>').addClass('card-title').text(weather.name);
    const weatherIcon = $('<img>').attr('src', iconUrl).attr('alt', weather.weather[0].description);
    const weatherDesc = $('<h3>').addClass('card-title').text(weather.weather[0].description);
    const weatherTemp = $('<p>').addClass('card-text').text(`Temperature: ${weather.main.temp}°C`);
    const weatherHumidity = $('<p>').addClass('card-text').text(`Humidity: ${weather.main.humidity}%`);
    const weatherWind = $('<p>').addClass('card-text').text(`Wind Speed: ${weather.wind.speed} m/s`);

    cardBody.append(weatherName, weatherIcon, weatherDesc, weatherTemp, weatherHumidity, weatherWind);
    card.append(cardBody);
    $('#weather-container').append(card);
}


// YouTube API Integration

function renderYT() {
    if (!window.YT) { 
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
}

// Modified to adjust display and to make sure the player loads correctly
function onYouTubeIframeAPIReady() {
    $('#player').css('display', 'block'); 
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: videoId, 
        playerVars: { 'playsinline': 1 },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        
    }
}
