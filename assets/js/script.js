const APIkey = "46d353ce29765dbac0983953dafd4b19"

$("form").on("submit",function(event){
    event.preventDefault();
    this.reset()

    
    let city = event.target[0].value;
    const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;

    fetch(queryURL)
    .then(response => {
    return response.json()
    })
    .then(data => generateWeather(data))
    .catch(error => console.log('ERROR'))
    localStorage.setItem('cityname', city)
})

function generateWeather(weather){
    console.log(weather)
    
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