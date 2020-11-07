// console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorMessage = document.querySelector('#error-message')
const coord = document.querySelector('#location')
const forecast = document.querySelector('#forecast-message')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    
    errorMessage.textContent = 'Loading weather data...'
    coord.textContent = ''
    forecast.textContent = ''
    
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        // console.log(response)
        response.json().then((data) => {
            // console.log(data)
            if(data.error){
                errorMessage.textContent = data.error
            }
            else{
                errorMessage.textContent = ''
                coord.textContent = `Latitude : ${data.location[0]} & Longitude : ${data.location[1]}`
                forecast.textContent = `Forecast : ${data.forecast}`
            }
        })
    })
    // console.log('testing...')
})