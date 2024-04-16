const APIkey = "46d353ce29765dbac0983953dafd4b19"

$("form").on("submit",function(event){
    event.preventDefault();
    
    
    let city = event.target[0].value;
    const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
    
    fetch(queryURL)
    .then(response => {
        return response.json()
    })
    .then(data =>{

        //const weatherId = data.weather[0].id
        const weatherId = 800
        generateWeather(data)
        if(weatherId <= 232){
            return fetch(`https://placeholder.com/rock-music`)

        }else if(weatherId >= 233 && weatherId <= 321){
            return fetch(`https://placeholder.com/sad-songs`)
        }else if(weatherId >= 322 && weatherId <= 531){
            return fetch(`https://placeholder.com/usher`)
        }else if(weatherId >= 532 && weatherId <= 622){
            return fetch(`https://placeholder.com/christmas-music`)
        }else if(weatherId >= 623 && weatherId <= 781){
            return fetch(`https://placeholder.com/spatial-audio`)
        }else if(weatherId == 800){
            return "ZbZSe6N_BXs"
        }else if(weatherId >= 801){
            return `https://placeholder.com/carpenters-rainy-days-are-mondays`
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
        onYouTubeIframeAPIReady(videoRes)
    })
    .catch(error => console.log(error))
    localStorage.setItem('cityname', city)

    
    this.reset();
})

function generateWeather(weather){
    console.log(weather)
const card =  $('<div>').addClass('card')
const cardBody = $('<div>').addClass('card-body')
   
    
   const weatherName = $('<h2>').text(weather.name)
   const weatherDesc = $('<h3>').text(weather.weather[0].description)
   const weatherTemp = $('<p>').text(weather.main.temp)

   weatherName.addClass('card-title') 
   weatherDesc.addClass('card-title')
   weatherTemp.addClass('card-text')

   $(cardBody).append(weatherName)
   $(cardBody).append(weatherDesc)
   $(cardBody).append(weatherTemp)


    $(card).append(cardBody)
    $('#weather-container').append(card)
}


// YouTube API Integration

var player;
function onYouTubeIframeAPIReady(videoId) {
    console.log(videoId)
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId,
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