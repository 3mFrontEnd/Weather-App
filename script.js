let weather = {

    // api key that catch from api.openweathermap.org
    'apiKey' : "fb77c284de80bf472dfe9161431677ad",
    fetchWeather : function(city){

    // catching APIs
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
              city +
              "&units=imperial&appid=" +
              this.apiKey
          ).then((response)=>response.json())
            .then((data)=> this.displayWeather(data));
    },
    displayWeather: function(data){ 

        // destructuring data 
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;

        // display them on the page
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "mile/h";
        document.querySelector(".weather").classList.remove("loading");
    },

    // function for search
    search : function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});

// event listener for Enter key on search box
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
});

// default city "Woodland Hills California"
weather.fetchWeather("woodland hills");