const apiUrl = "https://api.openweathermap.org/data/2.5/weather?appid=e817debcf3fd4333da6b53b67ae9a9ff&units=metric&q=";


let searchBtn = document.querySelector('#search button');
let input = document.querySelector('#search input');

searchBtn.addEventListener("click",()=>{
    checkWeather(input.value);
});
async function checkWeather(city){
    try{
        const response = await fetch(apiUrl + city);
        const data = await response.json();
        console.log(data);

        if(response.status === 404){
            document.querySelector('#card .error').style.display = "block";
            setTimeout( ()=>{
                document.querySelector('#card .error').style.display = "none";
            } , 1500);
            document.querySelector('#card h1').style.display = "none";
            document.querySelector('#card h2').style.display = "none";
            document.querySelector('#card #icon').style.display = "none";
            document.querySelector('#card #details').style.display = "none";

        }
        else{
            console.log("updated");

            document.querySelector('#card h1').innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector('#card h2').innerHTML = data.name ;
            document.querySelector('#card #details .col #humidity .value').innerHTML = data.main.humidity + "%";
            document.querySelector('#card #details .col #wind .value').innerHTML = data.wind.speed + "km/h";

            if(data.weather[0].main == "Clear"){
                document.querySelector('#card #icon img').src= "assets/sun (1).png";
            }else if(data.weather[0].main == "Rain"){
                document.querySelector('#card #icon img').src = "assets/heavy-rain.png";
            }else if(data.weather[0].main == "Snow"){
                document.querySelector('#card #icon img').src = "assets/snowman.png";
            }else if(data.weather[0].main == "Clouds"){
                document.querySelector('#card #icon img').src = "assets/cloudy.png";
            }else if(data.weather[0].main == "Mist"){
                document.querySelector('#card #icon img').src = "assets/foggy-day.png";
            }else if(data.weather[0].main == "Drizzle"){
                document.querySelector('#card #icon img').src = "assets/cloudy(1).png";
            }


            document.querySelector('#card h1').style.display = "flex";
            document.querySelector('#card h2').style.display = "flex";
            document.querySelector('#card #icon').style.display = "flex";
            document.querySelector('#card #details').style.display = "flex";
            }
    }

    catch(error){
        console.log(error);
    }
}