(async function start (){
    let city = 'Sorocaba'
    const apiKey = '6db148d76c2925e4ce113aa91e363660'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    const fetching = await fetch(url).then(response => response.json())
    
    getTemp(fetching)
    getName(fetching)
    getHumidity(fetching)
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
    
    if(state == 'Clear' && (hora > 18 || hora < 6)){
        photo.src = 'img/foggy-night.png'
    }
    
    if(state == 'Clear' && (hora > 6 || hora < 18)){

    }

    if(state == 'Clouds'){
        photo.src = 'img/cloudy.png'
    }
    
}


async function getApi() {
    let city = input.value
    const apiKey = '6db148d76c2925e4ce113aa91e363660'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    const fetching = await fetch(url).then(response => response.json())
    
    getTemp(fetching)
    getName(fetching)
    getHumidity(fetching)
    getMain(fetching)
    changeMainPhoto(fetching)
}