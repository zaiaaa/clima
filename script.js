(async function start (){
    let city = 'Sorocaba'
    const apiKey = '6db148d76c2925e4ce113aa91e363660'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    const fetching = await fetch(url).then(response => response.json())
    console.log(url)
    getTemp(fetching)
    getName(fetching)
    getHumidity(fetching)
    getWindSpeed(fetching)
    getMain(fetching)
    changeMainPhoto(fetching)
})()




const search = document.getElementById('search')
const input = document.getElementById('input')
const temperature = document.getElementById('temp')
const cityResponse = document.getElementById('city')
const humidityResponse = document.getElementById('humidity')
const state = document.getElementById('state')
const photo = document.getElementById('photo')
const errorCard = document.getElementById('error')
const wind = document.getElementById('wind')
const containerError = document.getElementById('form')


function getWindSpeed(data){
    const windSpeed = data.wind.speed    
    realWindSpeed = windSpeed * 3.6
    wind.innerHTML = `${Math.round(realWindSpeed)} km/h`
}

function getTemp (data) {
    const temp = data.main.temp
    temperature.innerHTML = `${Math.round(temp)}º`
}

function getName (data){
    const name = data.name
    cityResponse.innerHTML = name
}

function getHumidity(data){
    const humidity = data.main.humidity

    humidityResponse.innerHTML = humidity
}

function getMain(data){
    const main = data.weather[0]['main']
    state.innerHTML = main
}

let data = new Date();
let hora = data.getHours();

function changeMainPhoto (data){
    let state = data.weather[0]['main']
    console.log(state)
    
    if(state == 'Clear' && (hora >= 18 || hora < 6)){
        photo.src = 'img/crescent-moon.png'
        photo.style.maxWidth = '100px'
        photo.style.margin = '1rem 1rem'
        
    }else if(state == 'Clear' && (hora > 6 || hora < 19)){
        photo.src = 'img/sunny.png'
    }

    if(state == 'Clouds'){
        photo.src = 'img/cloudy.png'
    }

    if(state == 'Rain' && (hora >= 18 || hora < 6)){
        photo.src = 'img/rainy-night.png'
    }else if(state == 'Rain' && (hora > 6 || hora < 19)){
        photo.src = 'img/rainy.png'
    }

    
}
console.log(hora)

async function getApi() {
    let city = input.value
    const apiKey = '6db148d76c2925e4ce113aa91e363660'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    const header = await fetch(url).then(response => response)
    const fetching = await fetch(url).then(response => response.json())

    if(header.status != 200){
        containerError.style.height = '65px'
        errorCard.style.display = 'block'
        setTimeout(() => {
            errorCard.style.display = 'none'   
            containerError.style.height = '2rem'
          }, 2000);
    }
    
    getTemp(fetching)
    getName(fetching)
    getHumidity(fetching)
    getMain(fetching)
    getWindSpeed(fetching)
    changeMainPhoto(fetching)
    console.log(fetching)

}