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