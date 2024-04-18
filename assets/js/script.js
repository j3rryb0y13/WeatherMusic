const APIkey = "46d353ce29765dbac0983953dafd4b19"
const GooKey = "AIzaSyDdp5iphkWD7E92Kt38IlGzoDj2p1pBmQs"
let videoId
$("form").on("submit",function(event){
    event.preventDefault();
    
    
    let city = event.target[0].value;
    const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
    
    fetch(queryURL)
    .then(response => {
        return response.json()
    })
    .then(data =>{

        // const weatherId = data.weather[0].id
        const weatherId = 800
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

function renderYT() {
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
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

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
        //   setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }
    
