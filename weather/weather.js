const inputData = document.querySelector('.searchParent input')
const searchIcon = document.querySelector('.searchIcon')
const errorMassage = document.querySelector('.error-massage')
const showData = document.querySelector('.show-data')
const cityInput = document.querySelector('.city-input')

const apikey = "4e86a0495150152ea920791a0cdd7e0d"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="
async function checkWeather(city) {
   if(city.trim() === "") return;

    const response = await fetch(apiUrl + city + `&appid=${apikey}`)

    if(!response.ok) {
        errorMassage.style.display = 'block'
        showData.style.display = 'none';
       return;
    }
   
    errorMassage.style.display = 'none'
    const data = await response.json()
    document.querySelector('.cityName').innerText = data.name;
    document.querySelector('.temp').innerText = Math.round(data.main.temp)
    document.querySelector('.humidity').innerText = data.main.humidity
    document.querySelector('.speed').innerText = data.wind.speed
   
    const weatherMain = data.weather[0].main;
        let imageName = "default.png";

        if (weatherMain === "Clouds") {
            imageName = "clouds.png";
        } else if (weatherMain === "Clear") {
            imageName = "clear.png";
        } else if (weatherMain === "Rain") {
            imageName = "rain.png";
        } else if (weatherMain === "Drizzle") {
            imageName = "drizzle.png";
        } else if (
            weatherMain === "Mist" ||
            weatherMain === "Haze" ||
            weatherMain === "Fog" ||
            weatherMain === "Smoke"
        ) {
            imageName = "mist.png";
        }

        document.querySelector('#weathe-img').src = `./images/${imageName}`;
   
    showData.style.display = 'block';
}
searchIcon.addEventListener('click',()=>{
    checkWeather(inputData.value)
})
cityInput.addEventListener('click',()=>{
    errorMassage.style.display = 'none'
})
